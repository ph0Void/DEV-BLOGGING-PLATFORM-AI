import mongoose from "mongoose";

interface IMongoConfig {
    url: string;
    dbName: string;
}

export class MongoConfig {
    static async connectToDB(config: IMongoConfig) {
        try {
            await mongoose.connect(config.url, {
                dbName: config.dbName
            });
            console.log(`CONEXION EXITOSA A MONGODB ${config.dbName}`);
        } catch (error) {
            console.log(`CONEXION FALLIDA A MONGODB ${config.dbName}`);
            throw error;
        }
    }
}