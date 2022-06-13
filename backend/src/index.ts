import * as path from "path";
import { HttpServer } from "tsrpc";
import { Global } from "./models/Global";
import { serviceProto } from "./shared/protocols/serviceProto";
import dotenv from 'dotenv'

// 加载不同env的配置
switch (process.env.NODE_ENV) {
    case 'production':
        dotenv.config({ path: path.resolve(__dirname, '../env/.env.production') })
        break;
    case 'development':
        dotenv.config({ path: path.resolve(__dirname, '../env/.env.development') })
        break;
    default:
        dotenv.config({ path: path.resolve(__dirname, '../env/.env.development') })
        break;
}

// Create the Server
const server = new HttpServer(serviceProto, {
    port: Number(process.env.PORT),
    logLevel: 'warn'
});

// Initialize before server start
async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, "api"));

    // Prepare something... (e.g. connect the db)
    await Global.init(server.logger);
}

// Entry function
async function main() {
    await init();
    await server.start();
}
main().catch((e) => {
    server.logger.error(e);
    process.exit(-1);
});