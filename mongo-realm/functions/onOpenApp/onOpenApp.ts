const onOpenApp = async (): Promise<any> => {
    await addUserStatistics();
};

const addUserStatistics = async () => {
    const userStatistics = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection('UserStatistics');
    const userId = context.user.custom_data._id;
    if (!userId) return; // Function called by anon-user
    const updates = { $inc: { 'appOpened.count': 1 }, $push: { 'appOpened.list': { timestamp: new Date() } } };
    await userStatistics.updateOne({ _user_id: BSON.ObjectId(userId) }, updates);
};

export default onOpenApp;
