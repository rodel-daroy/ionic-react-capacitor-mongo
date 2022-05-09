import { IAchievement, IUser } from '../functions/schema-shims';
import { ObjectId } from 'mongodb';

interface IPayload {
    user?: IUser;
    userId?: ObjectId;
    achievementId: ObjectId;
}
export const getUserAchievements = async ({ user, userId, achievementId }: IPayload): Promise<IAchievement[]> => {
    const users = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    const u = user ? user : userId ? await users.findOne({ _id: userId }) : null;
    return u?.achievements.filter(({ _id }) => _id.toString() === achievementId.toString()) || [];
};
