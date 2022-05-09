import type { Collection } from 'mongodb';
import type { ObjectId, Timestamp } from 'bson';
import type { ICard, Schemas, IMetaCard, INotification } from '../schema-shims';
import { NOTIFICATION_TYPE, NOTIFICATION_STATUS } from '../../utility';

interface IOnCardPurchased {
    _id: ObjectId;
    operationType: 'UPDATE';
    fullDocument: ICard;
    ns: {
        db: string;
        coll: string;
    };
    documentKey: {
        _id: ObjectId;
    };
    updateDescription: {
        updatedFields: { previousOwners: ICard['previousOwners']; onSale: false; _user_id: ObjectId };
        removedFields: ['price'];
    };
    clusterTime: Timestamp;
}

const onCardPurchased = async (payload: IOnCardPurchased): Promise<any> => {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const metaCards = db.collection('MetaCard');
    const users = db.collection('User');
    const translations = db.collection('Translations');
    const notifications = db.collection('Notification');

    const pevOwnerId = payload.updateDescription.updatedFields.previousOwners.pop()?._user_id;
    if (!pevOwnerId) {
        throw new Error(
            `onCardPurchased: No previous owner present on purchased card ${payload.fullDocument._id.toString()}.`,
        );
    }

    const metaCard = await metaCards.findOne({ _id: payload.fullDocument._metaCard_id });
    if (!metaCard) {
        throw new Error(`No metaCard found.`);
    }

    const title = await getCardTitleLocalized(metaCard, pevOwnerId, users, translations);
    const mintNumber = payload.fullDocument.mintNumber;
    const price = payload.fullDocument.price.toString();
    const owners = await users.find({ _id: { $in: [pevOwnerId, payload.fullDocument._user_id] } }).toArray();
    const newOwner = owners.find((user) => user._id === payload.fullDocument._user_id);
    const prevOwner = owners.find((user) => user._id === pevOwnerId);
    if (!prevOwner || !newOwner) {
        throw new Error(`No previous owner found.`);
    }

    const sellerNotification: Omit<INotification, '_id'> = {
        _user_id: pevOwnerId,
        category: 'Transaction',
        content: `Your card ${title} - ${mintNumber} has been purchased by ${newOwner.username} for ${price} FZC.`,
        title: `Card was purchased: ${title} - ${mintNumber}`,
        type: NOTIFICATION_TYPE.NOTIFICATION,
        status: NOTIFICATION_STATUS.NOT_READ,
        createdAt: new Date(),
    };
    const buyerNotification: Omit<INotification, '_id'> = {
        _user_id: newOwner._id,
        category: 'Transaction',
        content: `You purchased the card ${title} - ${mintNumber} from ${prevOwner.username} for ${price} FZC.`,
        title: `Card purchased: ${title} - ${mintNumber}`,
        type: NOTIFICATION_TYPE.NOTIFICATION,
        status: NOTIFICATION_STATUS.NOT_READ,
        createdAt: new Date(),
    };

    await notifications.insertMany([sellerNotification, buyerNotification]);
};

/**
 * Get Translated metaCard.title
 * TODO: This function should be generalized and be available as util
 * E.g. createTranslator(ressourceWITHtranslation or { id, ressourceType }, userORidORlanguage) => getTranslation
 * getTranslation(key) => string | undefined
 */
const getCardTitleLocalized = async (
    metaCard: IMetaCard,
    userId: ObjectId,
    users: Collection<Schemas['User']>,
    translations: Collection<Schemas['Translations']>,
): Promise<string> => {
    const user = await users.findOne({ _id: userId });
    if (!user) {
        throw new Error(`No user found.`);
    }

    const { preferredLanguage } = user;

    if (!preferredLanguage || preferredLanguage === metaCard.language) {
        return metaCard.title;
    }

    const translation = await translations.findOne({ _id: metaCard._translations_id });
    if (!translation) {
        return metaCard.title;
    }

    const translatedTitle = translation.items.find((item) => item.language === preferredLanguage && item.id === 'title')
        ?.value;
    return translatedTitle || metaCard.title;
};

export default onCardPurchased;
