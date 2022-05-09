import { ObjectId } from 'mongodb';
import { ICard } from '../schema-shims';

type IOnCardUserUpdated = TRIGGER.UPDATE_PAYLOAD<ICard>;

const onCardUserUpdated = async (payload: IOnCardUserUpdated): Promise<void> => {
    const { _user_id: userId, previousOwners, _metaCard_id, mintNumber } = payload.fullDocument;
    await Promise.all([
        updateUserPoints({
            newOwnerId: userId,
            prevOwnerId: previousOwners[previousOwners.length - 1]._user_id,
            metaCardId: _metaCard_id,
            mintNumber,
        }),
        addUserStatistics(userId, previousOwners),
    ]);
};

const addUserStatistics = async (userId: ObjectId, previousOwners: ICard['previousOwners']) => {
    const userStatistics = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('UserStatistics');
    const previousOwnerId = previousOwners[previousOwners.length - 1]?._user_id;
    await userStatistics.updateOne({ _user_id: userId }, { $inc: { 'collectedCards.count': 1 } });

    if (previousOwnerId)
        await userStatistics.updateOne({ _user_id: previousOwnerId }, { $inc: { 'collectedCards.count': 1 } });
};

interface IUpdateUserPointsProps {
    newOwnerId: ObjectId;
    prevOwnerId: ObjectId;
    metaCardId: ObjectId;
    mintNumber: number;
}
const updateUserPoints = async ({ mintNumber, newOwnerId, prevOwnerId, metaCardId }: IUpdateUserPointsProps) => {
    const db = context.services.get('fanzone-dev-atlas').db('fanzone-dev');
    const users = db.collection('User');
    const metaCards = db.collection('MetaCard');
    const metaCard = await metaCards.findOne({ _id: metaCardId });
    if (!metaCard) throw new Error('MetaCard not found');

    try {
        // eslint-disable-next-line security/detect-eval-with-expression
        const fn = eval(metaCard.scoreCalc);
        const value = Math.round(fn(mintNumber * 10));

        await Promise.all([
            users.updateOne({ _id: newOwnerId }, { $inc: { points: value } }),
            users.updateOne({ _id: prevOwnerId }, { $inc: { points: 0 - value } }),
        ]);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    }
};
export default onCardUserUpdated;
