import { Collection, Db, MongoClient, OptionalId } from "mongodb";
import { Logger } from "tsrpc";
import { DbPost, DbAdmin } from "./dbs";

const DataBaseConfig = {
    mongoDb: "mongodb://lijiaqiang:bing.com@localhost:27017/dev?authSource=dev",
};
export class Global {
    static db: Db;

    static async init(logger?: Logger) {
        this.db = await this._getMongoDb(DataBaseConfig.mongoDb, logger);
    }

    private static _getMongoDb(uri: string, logger?: Logger): Promise<Db> {
        logger?.log(`Start connecting db...(${uri})`);
        let promise = new Promise<Db>((rs, rj) => {
            MongoClient.connect(uri, (err, client) => {
                if (err) {
                    logger?.error("Failed connected db.", err);
                    rj(err);
                } else if (client) {
                    logger?.log(`Connect db succ. (${uri})`);
                    rs(client.db());
                }
            });
        });
        return promise;
    }

    static collection<T extends keyof DbCollectionType>(
        col: T
    ): Collection<OptionalId<DbCollectionType[T]>> {
        return this.db.collection(col);
    }
}
export interface DbCollectionType {
    Post: DbPost;
    Admin: DbAdmin
}
