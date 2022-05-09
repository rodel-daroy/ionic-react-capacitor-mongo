interface IChangeEvent {
    documentKey: { [_id: string]: string };
    ns: { [coll: string]: string };
    operationType: string;
}

const addDate = async (changeEvent: IChangeEvent): Promise<any> => {
    const collection = context.services.get('fanzone-dev-atlas').db('fanzone-dev').collection(changeEvent.ns.coll);
    const now = new Date();
    if (changeEvent.operationType === 'insert') {
        return collection.updateOne({ _id: changeEvent.documentKey._id }, { $set: { createdAt: now, updatedAt: now } });
    } else if (changeEvent.operationType === 'update') {
        return collection.updateOne({ _id: changeEvent.documentKey._id }, { $set: { updatedAt: now } });
    }
};

export default addDate;
