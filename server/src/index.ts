
import { join } from "path";
import * as http from "http";
import { readConfig, IConfig } from "./read-config";
import { WSSocketProcessor } from "./ws-api";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Сообщения в случае ошибок
const WRONG_FORMAT = "WRONG_FORMAT";
const SYSTEM_ERROR = "SYSTEM_ERROR";
const UNKNOWN_TAG = "UNKNOWN_TAG";
const WRONG_TOKEN = "WRONG_TOKEN";
const BIG_DATA    = "BIG_DATA";

let config: IConfig;
try {
    config = readConfig(join(__dirname, "/config.json"));
} catch (e) {
    console.log(e.stack);
    process.exit(1);
}
const wsProcessor = new WSSocketProcessor(config);

function error(res: any, statusCode: number, errMsg: string) {
    res.status(statusCode);
    res.send(JSON.stringify({status: "error", error: errMsg }));
}
function resultOk(res: any, data?: any) {
    res.status(200);
    res.send(JSON.stringify({status: "ok", data}));
}
app.get("*", (req: any, res: any) => {
    res.send('Server is working. Please post at "/login" to submit a message.');
});
app.post("/login", (req: any, res: any) => {
    console.log("login");
    const currSessionId = wsProcessor.initializeConnect();
    return resultOk(res, {sessionId: currSessionId});
});
app.post("*", (req: any, res: any) => {
    return error(res, 400, WRONG_FORMAT);
});
app.listen(config.httpPort, () => {
    console.log("\x1b[36m", `Server is listening on ${config.httpPort}\n`);
});