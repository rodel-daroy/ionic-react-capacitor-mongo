import { IMetaCard } from '../schema-shims';

interface IUserSpecifigMetaCardFields {
    owned: boolean;
    onSaleByMe: boolean;
    onSaleByOthers: boolean;
    bookmarked: boolean;
}
const getUserSpecificMetaCardFields = async (source: IMetaCard): Promise<IUserSpecifigMetaCardFields> => {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const cardsCollection = db.collection('Card');
    const usersCollection = db.collection('User');
    const userId = context.user.custom_data._id;
    const [ownedCard, onSaleByMeCard, onSaleByOthersCard, user] = await Promise.all([
        // owned
        cardsCollection.findOne({ _metaCard_id: source._id, _user_id: BSON.ObjectId(userId) }),

        // onSaleByMe
        cardsCollection.findOne({ _metaCard_id: source._id, _user_id: BSON.ObjectId(userId), onSale: true }),

        // onSaleByOthers
        cardsCollection.findOne({ _metaCard_id: source._id, _user_id: { $ne: BSON.ObjectId(userId) }, onSale: true }),

        // bookmarked
        usersCollection.findOne({ _id: BSON.ObjectId(userId) }),
    ]);

    return {
        owned: Boolean(ownedCard),
        onSaleByMe: Boolean(onSaleByMeCard),
        onSaleByOthers: Boolean(onSaleByOthersCard),
        bookmarked: Boolean(user?._bookmarkedCard_ids.some((id) => source._id.toString() === id.toString())),
    };
};
export default getUserSpecificMetaCardFields;
