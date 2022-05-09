interface IOpenPackPayload {
    packId: string;
    userId: string;
}

const openPack = async (payload: IOpenPackPayload): Promise<any> => {
    const cluster = context.services.get('fanzone-dev-atlas');
    const session = cluster.startSession();
    try {
        const packs = cluster.db('fanzone-dev').collection('Pack');
        const cards = cluster.db('fanzone-dev').collection('Card');
        const userStatistics = cluster.db('fanzone-dev').collection('UserStatistics');

        /* Make sure all resources exist, then get selected pack */
        const pack = await packs.findOne({ _id: BSON.ObjectId(payload.packId), opened: false }, { session });
        if (!pack) throw new Error(`Pack with id ${payload.packId} is already opened.`);

        /* Check if current user is pack owner */
        if (pack._user_id.toString() !== payload.userId) throw new Error('User does not own this pack');

        await session.withTransaction(async () => {
            /* Apply changes */
            await Promise.all([
                packs.findOneAndUpdate({ _id: BSON.ObjectId(payload.packId) }, { $set: { opened: true } }, { session }),

                cards.updateMany(
                    { _id: { $in: pack._card_ids } },
                    { $set: { _user_id: BSON.ObjectId(payload.userId) } },
                    { session },
                ),

                userStatistics.updateOne(
                    { _user_id: BSON.ObjectId(payload.userId) },
                    {
                        $inc: { 'packs.opened.count': 1, 'collectedCards.count': pack._card_ids.length },
                        $push: { 'packs.opened.list': { _metaPack_id: pack._id, timestamp: new Date() } },
                    },
                ),
            ]);
        });
    } finally {
        session.endSession();
    }
};

export default openPack;
