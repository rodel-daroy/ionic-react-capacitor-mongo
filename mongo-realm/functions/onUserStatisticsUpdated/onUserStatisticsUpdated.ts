import { ObjectId, Timestamp } from 'mongodb';
import { insertAchievement, getUserAchievements } from '../../utility';
import { IMetaAchievement, IUser, IUserStatistics } from '../schema-shims';

const DAY = 1000 * 60 * 60 * 24;
interface IOnUserStatisticsUpdated {
    _id: ObjectId;
    operationType: 'UPDATE';
    fullDocument: IUserStatistics;
    ns: {
        db: string;
        coll: string;
    };
    documentKey: {
        _id: ObjectId;
    };
    updateDescription: {
        updatedFields: Partial<IUserStatistics>;
    };
    clusterTime: Timestamp;
}

const onUserStatisticsUpdated = async ({
    fullDocument,
    updateDescription: { updatedFields },
}: IOnUserStatisticsUpdated): Promise<any> => {
    const promises: Promise<any>[] = [];
    const keys = Object.keys(updatedFields).reduce(
        (acc, key) => Array.from(new Set([...acc, key.split('.').shift() || key])),
        [] as string[],
    );

    keys.forEach((key) => {
        switch (true) {
            case key.includes('appOpened'): {
                promises.push(appOpenedAchievements(fullDocument));
                break;
            }
            case key.includes('pageViews'): {
                promises.push(visitPageAchievements(fullDocument));
                break;
            }
            case key.includes('collectedCards'): {
                promises.push(collectCardsAchievements(fullDocument));
                break;
            }
            case key.includes('emailRegistered'): {
                promises.push(emailRegisteredAchievements(fullDocument));
                break;
            }
            case key.includes('market'): {
                promises.push(marketAchievements(fullDocument));
                break;
            }
            case key.includes('packs'): {
                break;
            }
            default:
        }
    });
    await Promise.all(promises);
};

const DAILY_LOGIN = 'daily_login';
const WEEKLY_LOGIN = 'weekly_login';
const appOpenedAchievements = async ({ _user_id, appOpened: { list } }: IUserStatistics) => {
    const startToday = new Date().setUTCHours(0, 0, 0, 0);
    const weekday = new Date(startToday).getDay(); // 0-6
    const startWeek = startToday - 1000 * 60 * 60 * 24 * weekday;

    const secondLastLogin = list[list.length - 2] || {};
    const lastLogin = list[list.length - 1] || {};

    /* First daily login */
    if (
        new Date(lastLogin.timestamp || 0).valueOf() > startToday &&
        new Date(secondLastLogin.timestamp || 0).valueOf() < startToday
    ) {
        await addAchievement(_user_id, DAILY_LOGIN);
    }

    /* Login each day of th week */
    const week = Array.from(Array(7)).map((_, i) => startWeek + DAY * i);
    // there needs to be one daily_login achievement for each interval in week
    if (await hasWeeklyLogins(_user_id, week)) {
        await addAchievement(_user_id, WEEKLY_LOGIN);
    }
};

const hasWeeklyLogins = async (userId: ObjectId, week: number[]): Promise<boolean> => {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const users = db.collection('User');
    const metaAchievements = db.collection('MetaAchievement');
    const user = await users.findOne({ _id: userId });
    const metaAchievement = await metaAchievements.findOne({ 'meta.internalName': DAILY_LOGIN, status: 'enabled' });
    if (!metaAchievement || !user) return false;
    const dailyLoginAchievements = user.achievements
        .filter(
            ({ _id, achievementDate }) => metaAchievement._id === _id && new Date(achievementDate).valueOf() > week[0],
        )
        .map(({ achievementDate }) => new Date(achievementDate).valueOf());

    return week.every((beginningOfDay) =>
        dailyLoginAchievements.some((date) => date >= beginningOfDay && date < beginningOfDay + DAY),
    );
};

const REGISTER_EMAIL = 'register_email';
const emailRegisteredAchievements = async ({ _user_id }: IUserStatistics) => {
    await addAchievement(_user_id, REGISTER_EMAIL);
};

const VISIT_COLLECTION = 'visit_collection';
const visitPageAchievements = async ({ _user_id, pageViews: { list } }: IUserStatistics) => {
    if (list.some(({ name }) => name === 'collect')) {
        await addAchievement(_user_id, VISIT_COLLECTION);
    }
};

const DAILY_FIRST_BUY_MARKET = 'daily_1st_buy_market';
const DAILY_FIRST_SELL_MARKET = 'daily_1st_sell_market';
const WEEKLY_TENTH_BUY_MARKET = 'weekly_10_buys_market';
const WEEKLY_TENTH_SELL_MARKET = 'weekly_10_sells_market';
const marketAchievements = async ({ _user_id, market: { purchases, sales } }: IUserStatistics) => {
    const startToday = new Date().setUTCHours(0, 0, 0, 0);
    const weekday = new Date(startToday).getDay(); // 0-6
    const startWeek = startToday - 1000 * 60 * 60 * 24 * weekday;

    const purchasesToday = purchases.list.filter((item) => new Date(item.timestamp).valueOf() > startToday);
    const purchasesThisWeek = purchases.list.filter((item) => new Date(item.timestamp).valueOf() > startWeek);
    const salesToday = sales.list.filter((item) => new Date(item.timestamp).valueOf() > startToday);
    const salesThisWeek = sales.list.filter((item) => new Date(item.timestamp).valueOf() > startWeek);

    if (purchasesToday.length === 1) {
        await addAchievement(_user_id, DAILY_FIRST_BUY_MARKET);
    }

    if (salesToday.length === 1) {
        await addAchievement(_user_id, DAILY_FIRST_SELL_MARKET);
    }

    if (purchasesThisWeek.length === 10) {
        await addAchievement(_user_id, WEEKLY_TENTH_BUY_MARKET);
    }

    if (salesThisWeek.length === 10) {
        await addAchievement(_user_id, WEEKLY_TENTH_SELL_MARKET);
    }
};

const COLLECT_TEN_CARDS = 'collect_10_cards';
const COLLECT_FIFTY_CARDS = 'collect_50_cards';
const COLLECT_HUNDRED_CARDS = 'collect_100_cards';
const collectCardsAchievements = async ({ _user_id, collectedCards: { count } }: IUserStatistics) => {
    if (count >= 10) await addAchievement(_user_id, COLLECT_TEN_CARDS);
    if (count >= 50) await addAchievement(_user_id, COLLECT_FIFTY_CARDS);
    if (count >= 100) await addAchievement(_user_id, COLLECT_HUNDRED_CARDS);
};

const addAchievement = async (_user_id: ObjectId, achievementName: string) => {
    const metaAchievements_col = context.services
        .get('fanzone-dev-atlas')
        .db('fanzone-dev')
        .collection('MetaAchievement');
    const metaAchievement = await metaAchievements_col.findOne({
        'meta.internalName': achievementName,
        status: 'enabled',
    });

    if (
        await shouldAchievementBeGranted({
            userId: _user_id,
            metaAchievement,
        })
    ) {
        await insertAchievement({
            userId: _user_id,
            achievementId: metaAchievement!._id,
        });
    }
};

const shouldAchievementBeGranted = async ({
    metaAchievement,
    userId,
    user,
}: {
    metaAchievement: IMetaAchievement | null;
    userId: ObjectId;
    user?: IUser;
}): Promise<boolean> => {
    if (!metaAchievement || metaAchievement.status === 'disabled') return false;
    const startDay = new Date().setUTCHours(0, 0, 0, 0);
    const weekday = new Date(startDay).getDay(); // 0-6
    const startWeek = startDay - 1000 * 60 * 60 * 24 * weekday;
    const userAchievements = await getUserAchievements({ user, userId, achievementId: metaAchievement._id });
    switch (metaAchievement.meta.timeframe) {
        case 'one-off': {
            if (userAchievements.length) return false;
            break;
        }
        case 'weekly': {
            if (userAchievements.some(({ achievementDate }) => new Date(achievementDate).valueOf() > startWeek))
                return false;
            break;
        }
        case 'daily': {
            if (userAchievements.some(({ achievementDate }) => new Date(achievementDate).valueOf() > startDay))
                return false;
            break;
        }
        default:
    }
    return true;
};

export default onUserStatisticsUpdated;
