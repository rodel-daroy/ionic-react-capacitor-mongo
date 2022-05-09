const onVisitCollect = async (): Promise<any> => {
    await addUserStatistics();
};

const addUserStatistics = async () => {
    const userId = context.user.custom_data._id;
    if (!userId) return;
    const userStatistics = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('UserStatistics');
    await userStatistics.updateOne(
        { _user_id: BSON.ObjectId(userId) },
        { $inc: { 'pageViews.count': 1 }, $push: { 'pageViews.list': { name: 'collect', timestamp: new Date() } } },
    );
};

export default onVisitCollect;
