import { MongoConfig } from "./config/MongoConfig";
import { EnvConfig } from "./config/EnvCondig";
import { ServerApp } from "./presentation/ServerApp";

async function main() {
    try {
        await MongoConfig.connectToDB({
            url: EnvConfig.MONGO_URL,
            dbName: EnvConfig.MONGO_DB_NAME,
        });

        const port = EnvConfig.PORT;
        const app = ServerApp.start();

        app.listen(port, () => {
            console.log(`SERVIDOR INICIADO EN http://localhost:${port}`);
        });

    } catch (error) {
        console.log(`ERROR AL INICIAR EL SERVIDOR: ${error}`);
        process.exit(1);
    }
}

main();