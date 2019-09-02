
import { join } from "path";
import { readConfig, IConfig } from "./read-config";
import { WSSocketProcessor } from "./ws-api";
import { MiddleWares } from "./middlewares";
import { HttpServer } from "./http-api";


interface IUploadData {
    currentSize: number;
    userSize: number;
    fileName: string;
}

let config: IConfig;
try {
    config = readConfig(join(__dirname, "/config.json"));
} catch (e) {
    console.log(e.stack);
    process.exit(1);
}

const middleWares = new MiddleWares(config);
const wsProcessor = new WSSocketProcessor(config, middleWares._app);
const httpServer = new HttpServer(config, middleWares._app, wsProcessor._token);

httpServer.on("upload", (uploadData: IUploadData) => {
    wsProcessor.sendMessage(uploadData);
});

process.on("SIGINT", () => {
    console.log("exiting...");
    wsProcessor.closeConnection();
    middleWares.stopRedisClient();
    process.exit();
});



