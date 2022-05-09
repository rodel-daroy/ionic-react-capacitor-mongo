import { TransactionOptions } from 'mongodb';
import { NOTIFICATION_TYPE, NOTIFICATION_STATUS } from '../../utility';

interface IPurchaseCardFromMarketPayload {
    cardId: string;
}

const purchaseCardFromMarket = async (payload: IPurchaseCardFromMarketPayload): Promise<any> => {
    const buyerId = context.user.custom_data._id;
    const cluster = context.services.get('fanzone-dev-atlas');
    const cards = cluster.db('fanzone-dev').collection('Card');
    const users = cluster.db('fanzone-dev').collection('User');
    const notifications = cluster.db('fanzone-dev').collection('Notification');
    const translations = cluster.db('fanzone-dev').collection('Translations');
    const metaCards = cluster.db('fanzone-dev').collection('MetaCard');
    const userStatistics = cluster.db('fanzone-dev').collection('UserStatistics');
    const session = cluster.startSession({ defaultTransactionOptions: { readPreference: 'primary' } });
    const transactionOptions: TransactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };
    try {
        /* Make sure all resources exist
         * NOTE: We cannot use .find/.findOne queries within a Transaction (Realm specific?) so we do it before.
         */
        const card = await cards.findOne({ _id: BSON.ObjectId(payload.cardId), onSale: true });
        if (!card) throw new Error(`Card with id ${payload.cardId} not on sale.`);
        if (!card.price) throw new Error(`Card with id ${payload.cardId} has no price set.`);

        const owner = await users.findOne({ _id: card._user_id });
        if (!owner)
            throw new Error(`Owner (${card._user_id.toHexString()}) of card with id ${payload.cardId} not found`);

        const buyer = await users.findOne({ _id: BSON.ObjectId(buyerId) });
        if (!buyer) throw new Error(`Buyer (${buyerId}) not found`);

        const metaCard = await metaCards.findOne({ _id: card._metaCard_id });
        if (!metaCard) throw new Error(`MetaCard for card ${card._id.toString()} not found.`);

        const cardTranslations = await translations.findOne({ _relation_id: metaCard._id });
        const cardTitle =
            (cardTranslations && cardTranslations.items.find(({ id }) => id === 'title')?.value) ||
            card._metaCard_id.toString();

        /* Check if buyer has sufficient funds */
        const cardPrice = parseFloat(card.price.toString());
        const buyerCoins = parseFloat(buyer.coins.toString());
        if (buyerCoins < cardPrice) throw new Error('Insufficient funds.');

        const previousOwner = {
            _user_id: card._user_id,
            transferDate: new Date().toUTCString(),
            transferType: 'purchase',
            purchasePrice: card.price,
        };

        await session.withTransaction(async () => {
            /* Apply changes */
            await Promise.all([
                /* Update Buyer - subtract price of card */
                users.updateOne(
                    { _id: BSON.ObjectId(buyerId), coins: { $gte: card.price } },
                    {
                        $inc: { coins: 0 - ((card.price as unknown) as number) },
                        $push: { previousOwners: previousOwner },
                    },
                    { session },
                ),

                /* Update Seller - add price of card */
                users.updateOne({ _id: card._user_id }, { $inc: { coins: card.price } }, { session }),

                cards.updateOne(
                    { _id: BSON.ObjectId(payload.cardId), onSale: true },
                    { $set: { _user_id: buyer._id, onSale: false }, $unset: { onSaleDate: '', price: '' } },
                    { session },
                ),

                userStatistics.updateOne(
                    { _user_id: card._user_id },
                    {
                        $inc: { 'market.purchases.count': 1, 'collectedCards.count': 1 },
                        $push: { 'market.purchases.list': { _card_id: card._id, timestamp: new Date() } },
                    },
                ),

                userStatistics.updateOne(
                    { _user_id: buyer._id },
                    {
                        $inc: { 'market.sales.count': 1, 'collectedCards.count': -1 },
                        $push: { 'market.sales.list': { _card_id: card._id, timestamp: new Date() } },
                    },
                ),

                notifications.insertMany([
                    {
                        _user_id: card._user_id,
                        category: 'notification',
                        content: `You sold a card for ${cardPrice} FZC: ${cardTitle} - Mint ${card.mintNumber}`,
                        title: `You sold a card for ${cardPrice} FZC: ${cardTitle} - Mint ${card.mintNumber}`,
                        type: NOTIFICATION_TYPE.NOTIFICATION,
                        status: NOTIFICATION_STATUS.NOT_READ,
                        createdAt: new Date(),
                    },
                    {
                        _user_id: BSON.ObjectId(buyerId),
                        category: 'notification',
                        content: `You bought a card for ${cardPrice} FZC: ${cardTitle} - Mint ${card.mintNumber}`,
                        title: `You bought a card for ${cardPrice} FZC: ${cardTitle} - Mint ${card.mintNumber}`,
                        type: NOTIFICATION_TYPE.NOTIFICATION,
                        status: NOTIFICATION_STATUS.NOT_READ,
                        createdAt: new Date(),
                    },
                ]),
                // create notifications for buyer & seller
            ]);
        }, transactionOptions);
    } finally {
        session.endSession();
    }
};

export default purchaseCardFromMarket;
