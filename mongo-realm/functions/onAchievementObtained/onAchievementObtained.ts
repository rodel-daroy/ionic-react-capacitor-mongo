import { IAchievement, IMetaAchievement, INotification, ITranslation, IUser } from '../schema-shims';
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE, ACHIEVEMENT_STATUS } from '../../utility';
import { ObjectId } from 'mongodb';

type IOnAchievementObtained = TRIGGER.UPDATE_PAYLOAD<IUser>;

const UNITS: Record<string, string> = {
    igc: ' FZC',
    points: ' points',
};
const onAchievementObtained = async (payload: IOnAchievementObtained): Promise<any> => {
    const keys = Object.keys(payload.updateDescription.updatedFields || {})
        .map((key) => key.includes('achievements') && key)
        .filter(Boolean) as string[];

    if (!keys.length) return;
    const newAchievementIds = findNewAchievements(payload, keys);
    if (!newAchievementIds.length) return;

    await Promise.all([
        addNotifications(newAchievementIds, payload),
        applyAchievementAwards(newAchievementIds, payload),
        updateAchievementStatus(newAchievementIds, payload.documentKey._id),
    ]);
};

export default onAchievementObtained;

const findNewAchievements = (payload: IOnAchievementObtained, keys: string[]): ObjectId[] => {
    return (
        keys
            // eslint-disable-next-line security/detect-object-injection
            .map((key) => payload.updateDescription.updatedFields![key] as IAchievement)
            .filter(({ status }) => status === ACHIEVEMENT_STATUS.NEW)
            .map(({ _id }) => _id)
    );
};

const addNotifications = async (achievementIds: ObjectId[], payload: IOnAchievementObtained) => {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const notifications = db.collection('Notification');
    const metaAchievements_col = db.collection('MetaAchievement');
    const translations_col = db.collection('Translations');

    const [metaAchievements, translations] = await Promise.all([
        metaAchievements_col.find({ _id: { $in: achievementIds } }).toArray(),
        translations_col.find({ _relation_id: { $in: achievementIds } }).toArray(),
    ]);

    const newNotifications: Omit<INotification, '_id'>[] = createAchievementNotification({
        userId: payload.fullDocument._id,
        achievementIds,
        metaAchievements,
        translations,
    });
    return notifications.insertMany(newNotifications);
};

const createAchievementNotification = ({
    userId,
    achievementIds,
    metaAchievements,
    translations,
}: {
    userId: ObjectId;
    achievementIds: IAchievement['_id'][];
    metaAchievements: IMetaAchievement[];
    translations: ITranslation[];
}) =>
    achievementIds.map((achievementId) => {
        const metaAchievement = metaAchievements.find(({ _id }) => achievementId === _id);
        const translation = translations.find(
            ({ _relation_id }) => _relation_id.toString() === achievementId.toString(),
        );

        const title =
            translation?.items.find((item) => item.id === 'title')?.value ||
            `TRANSLATION MISSING FOR ACHIEVEMENT ${achievementId.toString()}`;

        // eslint-disable-next-line security/detect-object-injection
        const reward = metaAchievement?.rewards.map(({ type, value }) => `${value}${UNITS[type] || ''}`).join(', ');
        const rewardstring = reward ? `and received the following reward: ${reward}.` : '';

        return {
            _user_id: userId,
            category: 'achievement',
            content: `You completed the achievement ${title}${rewardstring}`,
            title: `Achievement unlocked: ${title}`,
            type: NOTIFICATION_TYPE.NOTIFICATION,
            status: NOTIFICATION_STATUS.NOT_READ,
            createdAt: new Date(),
        };
    });

const applyAchievementAwards = async (newAchievementIds: ObjectId[], payload: IOnAchievementObtained) => {
    const users = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');

    const metaAchievements = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('MetaAchievement');
    const achievements = await metaAchievements.find({ _id: { $in: newAchievementIds } }).toArray();
    const rewards = achievements.map(({ rewards }) => rewards).flat();
    const reduced = rewards.reduce(
        (acc, { type, value }) => {
            if (type === 'igc') acc.igc = (acc.igc || 0) + parseInt(value);
            if (type === 'points') acc.points = (acc.points || 0) + parseInt(value);
            if (type === 'other') acc.other = [...acc.other, value];
            return acc;
        },
        { igc: 0, points: 0, other: [] } as { igc: number; points: number; other: string[] },
    );

    await users.updateOne({ _id: payload.fullDocument._id }, { $inc: { coins: reduced.igc, points: reduced.points } });
};

const updateAchievementStatus = async (newAchievementIds: ObjectId[], userId: ObjectId) => {
    const users = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    await users.updateOne(
        { _id: userId },
        { $set: { 'achievements.$[element].status': ACHIEVEMENT_STATUS.NOT_SEEN } },
        { arrayFilters: [{ 'element.status': ACHIEVEMENT_STATUS.NEW, 'element._id': { $in: newAchievementIds } }] },
    );
};
