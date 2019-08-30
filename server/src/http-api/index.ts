const express = require("express");
const cors = require("cors");
import { IConfig } from "../read-config";
import { EventEmitter } from "events";

// Сообщения в случае ошибок
const WRONG_FORMAT = "WRONG_FORMAT";
const SYSTEM_ERROR = "SYSTEM_ERROR";
const UNKNOWN_TAG = "UNKNOWN_TAG";
const WRONG_TOKEN = "WRONG_TOKEN";
const BIG_DATA    = "BIG_DATA";

export class HttpServer extends EventEmitter {
    constructor(private config: IConfig, private app: any) {
        super();
        this.httpServer();
    }

    private httpServer() {
        this.app.get("*", (req: any, res: any) => {
            res.send('Server is working. Please post at "/login" to submit a message.');
        });
        this.app.post("/login", (req: any, res: any) => {
            return resultOk(res, {sessionId: req.sessionID});
        });
        this.app.post("*", (req: any, res: any) => {
            return error(res, 400, WRONG_FORMAT);
        });
        this.app.listen(this.config.httpPort, () => {
            console.log("\x1b[36m", `Server is listening on ${this.config.httpPort}\n`);
            console.log("\x1b[37m", "");
        });
    }
}

function error(res: any, statusCode: number, errMsg: string) {
    res.status(statusCode);
    res.send(JSON.stringify({status: "error", error: errMsg }));
}
function resultOk(res: any, data?: any) {
    res.status(200);
    res.send(JSON.stringify({status: "ok", data}));
}