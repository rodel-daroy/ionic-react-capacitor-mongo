import 'mongodb';
import { Schemas } from '../../functions/schema-shims';

declare module 'mongodb' {
    interface Db {
        db(dbName?: 'fanzone-dev', options?: MongoClientCommonOption): Db;
        collection<T extends keyof Schemas = any>(
            name: T,
            callback?: MongoCallback<Collection<Schemas[T]>>,
        ): Collection<Schemas[T]>;
        collection<T extends keyof Schemas = any>(
            name: T,
            options: DbCollectionOptions,
            callback?: MongoCallback<Collection<Schemas[T]>>,
        ): Collection<Schemas[T]>;
    }
}
