const express = require("express");
const cors = require("cors");
const arguard = require("arguard");
import { IConfig } from "../read-config";
import { EventEmitter } from "events";

// Сообщения в случае ошибок
const WRONG_FORMAT = "WRONG_FORMAT";
const WRONG_SEQUENCE = "WRONG_SEQUENCE";
const SYSTEM_ERROR = "SYSTEM_ERROR";
const UNKNOWN_TAG = "UNKNOWN_TAG";
const WRONG_TOKEN = "WRONG_TOKEN";
const BIG_DATA    = "BIG_DATA";

class SequenceError extends Error {
    constructor(errMsg: string) {
        super(errMsg);
    }
}

export class HttpServer extends EventEmitter {
    constructor(private config: IConfig, private app: any, private token: string) {
        super();
        this.httpServer();
    }

    private httpServer() {
        this.app.get("*", (req: any, res: any) => {
            res.send('Server is working. Please post at "/login" to submit a message.');
        });

        this.app.post("/login", (req: any, res: any) => {
            req.session.login = req.sessionID;
            return resultOk(res, {sessionId: req.session.login});
        });
        this.app.post("/logout", (req: any, res: any) => {
            req.session.destroy();
            req.logout();
            return resultOk(res, {});
        });
        // TODO: try in try??? seriously?
        this.app.post("/subscribe", (req: any, res: any) => {
            try {
                try {
                    if (req.body.sessionId !== req.sessionID) {
                        throw new SequenceError("Different sessionId");
                    }
                    arguard.string(req.body.sessionId, "sessionID").nonempty();
                }
                catch (err) {
                    if (err instanceof SequenceError) {
                        return error(res, 400, WRONG_SEQUENCE);
                    }
                    return error(res, 400, WRONG_FORMAT);
                }
            }
            catch (err) {
                return error(res, 500, SYSTEM_ERROR);
            }
            return resultOk(res, {token: this.token});
        });

        this.app.all((req: any, res: any) => {
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