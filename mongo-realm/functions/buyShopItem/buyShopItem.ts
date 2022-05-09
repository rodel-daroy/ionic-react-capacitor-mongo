import { TransactionOptions } from 'mongodb';
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from '../../utility';

interface IBuyShopItemPayload {
    id: string;
    numItems: number;
    paymentMethod: 'igc';
}
const buyShopItem = async ({ id, numItems }: IBuyShopItemPayload): Promise<void> => {
    const cluster = context.services.get('fanzone-dev-atlas');
    const db = cluster.db('fanzone-dev');
    const userId = context.user.custom_data._id; // as string
    const users = db.collection('User');
    const packs = db.collection('Pack');
    const notifications = db.collection('Notification');
    const shopItems = db.collection('ShopItem');

    const user = await users.findOne({ _id: BSON.ObjectId(userId) });
    if (!user) throw new Error('User does not exist');
    const purchasedItem = await shopItems.findOne({ _id: BSON.ObjectId(id) });
    if (!purchasedItem) throw new Error('ShopItem does not exist');

    const totalPrice = numItems * parseFloat(purchasedItem.price.toString());
    if (parseFloat(user.coins.toString()) < totalPrice) throw new Error('Insufficient funds');

    const session = cluster.startSession({ defaultTransactionOptions: { readPreference: 'primary' } });
    const transactionOptions: TransactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };
    try {
        await session.withTransaction(async () => {
            if (purchasedItem.type === 'token') {
                const totalValue = parseFloat(purchasedItem.value?.toString() || '0') * numItems;
                await users.updateOne({ _id: BSON.ObjectId(userId) }, { $inc: { coins: totalValue - totalPrice } });
            }
            if (purchasedItem.type === 'pack' && purchasedItem._metaPack_id) {
                await users.updateOne({ _id: BSON.ObjectId(userId) }, { $inc: { coins: 0 - totalPrice } });
                const purchasedPacks = await packs
                    .find({
                        _user_id: BSON.ObjectId('6048c21a086d3bd7a4708388'),
                        _metaPack_id: purchasedItem._metaPack_id,
                    })
                    .limit(numItems)
                    .toArray();
                await packs.updateMany(
                    { _id: { $in: purchasedPacks.map(({ _id }) => _id) } },
                    { $set: { _user_id: BSON.ObjectId(userId) } },
                );
            }
            await notifications.insertOne({
                _user_id: BSON.ObjectId(userId),
                category: 'notification',
                content: `You purchased ${numItems}x ${purchasedItem.name} for ${totalPrice} FZC from the Shop`,
                title: `You purchased ${numItems}x ${purchasedItem.name} for ${totalPrice} FZC from the Shop`,
                type: NOTIFICATION_TYPE.NOTIFICATION,
                status: NOTIFICATION_STATUS.NOT_READ,
                createdAt: new Date(),
            });
        }, transactionOptions);
    } finally {
        session.endSession();
    }
};
export default buyShopItem;
