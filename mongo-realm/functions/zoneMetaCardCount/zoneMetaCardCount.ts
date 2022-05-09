import { IZone } from '../schema-shims';

const zoneMetaCardCount = async (source: IZone): Promise<{ total: number; owned: number }> => {
    const metaCardsCollection = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('MetaCard');
    const cardsCollection = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('Card');
    const zoneId = source._id;
    const _user_id = BSON.ObjectId(context.user.custom_data._id);
    const metaCards = await metaCardsCollection.find({ _zone_ids: zoneId }).toArray();
    const total = metaCards.length;
    const metaCardIds = metaCards.map(({ _id }) => _id);
    const cards = await cardsCollection.find({ _user_id, _metaCard_id: { $in: metaCardIds } }).toArray();
    const uniqueCards = new Set(cards.map(({ _metaCard_id }) => _metaCard_id.toString()));
    const owned = uniqueCards.size;
    return { total, owned };
};

export default zoneMetaCardCount;
