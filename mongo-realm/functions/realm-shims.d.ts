type Services = {
    (name: 'fanzone-dev-atlas'): import('mongodb').MongoClient;
    (name: 'http'): import('./http-shims').HTTP;
    (name: 'push-notifications'): Record<string, any>;
};
type ValueNames = 'jwtSecretMagicLink' | 'sendingBlueBaseURL' | 'sendingBlueApiKey' | 'clientBaseURL';
type Values = {
    (name: ValueNames): string;
};

declare namespace context {
    const services: {
        get: Services;
    };
    const functions: {
        execute: (name: string, ...args: any[]) => any;
    };
    const values: {
        get: Values;
    };
    const user: {
        id: string;
        type: 'normal' | 'server' | 'system';
        data: Record<string, unknown>;
        custom_data: import('./schema-shims').IUser & { _id: string };
        identities: any[];
    };
    const http: import('./http-shims').HTTP;
}

declare namespace BSON {
    const ObjectId: (arg: string) => import('mongodb').ObjectId;
    const Decimal128: {
        fromString: (number: string) => import('mongodb').Decimal128;
    };
}

declare namespace TRIGGER {
    type ObjectId = import('mongodb').ObjectId;
    type Timestamp = import('mongodb').Timestamp;
    type Schemas = import('./schema-shims').Schemas;

    interface UPDATE_PAYLOAD<Entity extends Schemas[keyof Schemas], FullDocument extends boolean = true> {
        _id: ObjectId;
        operationType: 'update';
        fullDocument: FullDocument extends true ? Entity : undefined;
        ns: {
            db: string;
            coll: string;
        };
        documentKey: {
            _id: ObjectId;
        };
        updateDescription: {
            updatedFields?: Partial<Entity> & { [key: string]: any };
            removedFields?: Array<keyof Entity>;
        };
        clusterTime: Timestamp;
    }
    interface INSERT_PAYLOAD<Entity extends Schemas[keyof Schemas], FullDocument extends boolean = true> {
        _id: ObjectId;
        operationType: 'insert';
        fullDocument: FullDocument extends true ? Entity : undefined;
        ns: {
            db: string;
            coll: string;
        };
        documentKey: {
            _id: ObjectId;
        };
        clusterTime: Timestamp;
    }

    type REPLACE_PAYLOAD<E extends Schemas[keyof Schemas], F extends boolean = true> = INSERT_PAYLOAD<E, F>;
}
