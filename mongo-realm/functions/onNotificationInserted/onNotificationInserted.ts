import { INotification } from 'functions/schema-shims';
import { ObjectId, Timestamp } from 'mongodb';

interface IOnNewNotification {
    _id: ObjectId;
    operationType: 'INSERT';
    fullDocument: INotification;
    ns: {
        db: string;
        coll: string;
    };
    documentKey: {
        _id: ObjectId;
    };
    clusterTime: Timestamp;
}

const onNewNotification = (_payload: IOnNewNotification): any => {
    // eslint-disable-next-line no-console
    console.log('TODO: Send New Notification');
};

export default onNewNotification;
