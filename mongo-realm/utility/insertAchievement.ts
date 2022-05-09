import { ObjectId, UpdateWriteOpResult } from 'mongodb';
import { IUser } from '../functions/schema-shims';
import { ACHIEVEMENT_STATUS } from './achievementEnums';

export const insertAchievement = async ({
    userId,
    achievementId,
}: {
    userId: ObjectId;
    achievementId: ObjectId;
}): Promise<UpdateWriteOpResult> => {
    const users = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('User');
    const newAchievement: IUser['achievements'][number] = {
        _id: achievementId,
        achievementDate: new Date(),
        status: ACHIEVEMENT_STATUS.NEW,
    };

    return users.updateOne({ _id: userId }, { $push: { achievements: newAchievement } });
};
