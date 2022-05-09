import { ObjectId } from 'mongodb';
import { IUserStatistics } from '../schema-shims';

interface IOnNewUser {
    user: {
        id: string;
        data: { [key: string]: string };
        identities: Array<{ id: string }>;
    };
}

const onNewUser = async (payload: IOnNewUser): Promise<any> => {
    const userId = BSON.ObjectId(payload.user.identities[0].id);
    const accountId = payload.user.id;
    await setAccountIdForUser(userId, accountId);
    await insertUserStatisticsDocument(userId);
    await addUserStatistics(userId);
};

export default onNewUser;

const addUserStatistics = async (userId: ObjectId) => {
    const userStatistics = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('UserStatistics');
    await userStatistics.updateOne({ _user_id: userId }, { $set: { emailRegistered: new Date() } });
};

const setAccountIdForUser = async (userId: ObjectId, accountId: string) => {
    const cluster = context.services.get('fanzone-dev-atlas');
    const users = cluster.db('fanzone-dev').collection('User');
    return users.updateOne({ _id: userId }, { $set: { accountId } });
};

const insertUserStatisticsDocument = async (userId: ObjectId) => {
    const cluster = context.services.get('fanzone-dev-atlas');
    const userStatistics = cluster.db('fanzone-dev').collection('UserStatistics');

    // TBD: Should this doc be pre-populated? MongoDB updates can create fields automatically
    const newDoc: Omit<IUserStatistics, '_id'> = {
        _user_id: userId,
        emailRegistered: null,
        appOpened: {
            count: 0,
            list: [],
        },
        pageViews: {
            count: 0,
            list: [],
        },
        collectedCards: {
            count: 0,
        },
        market: {
            purchases: {
                count: 0,
                list: [],
            },
            sales: {
                count: 0,
                list: [],
            },
        },
        games: {
            playedCount: 0,
            penalty: {
                playedCount: 0,
                list: [],
            },
        },
        packs: {
            opened: {
                count: 0,
                list: [],
            },
        },
    };
    return userStatistics.insertOne(newDoc);
};
