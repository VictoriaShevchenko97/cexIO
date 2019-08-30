
import { join } from "path";
import { readConfig, IConfig } from "./read-config";
import { WSSocketProcessor } from "./ws-api";
import { MiddleWares } from "./middlewares";
import { HttpServer } from "./http-api";



let config: IConfig;
try {
    config = readConfig(join(__dirname, "/config.json"));
} catch (e) {
    console.log(e.stack);
    process.exit(1);
}

const middleWares = new MiddleWares(config);
const wsProcessor = new WSSocketProcessor(config);
const httpServer = new HttpServer(config, middleWares._app);






