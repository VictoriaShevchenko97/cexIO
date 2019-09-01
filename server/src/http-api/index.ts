const express = require("express");
const cors = require("cors");
const arguard = require("arguard");
import { IConfig } from "../read-config";
import { EventEmitter } from "events";
import { uploadDataInFile } from "../helpers/fileUpload";

// Сообщения в случае ошибок
const WRONG_FORMAT = "WRONG_FORMAT";
const WRONG_SEQUENCE = "WRONG_SEQUENCE";
const SYSTEM_ERROR = "SYSTEM_ERROR";
const UNKNOWN_TAG = "UNKNOWN_TAG";
const WRONG_TOKEN = "WRONG_TOKEN";
const BIG_DATA    = "BIG_DATA";

// макс. размер создаваемого файла в байтах (2 мб)
const MAX_DATA_SIZE = 2 * 1024 * 1024;

class SequenceError extends Error {
    constructor(errMsg = WRONG_SEQUENCE) {
        super(errMsg);
    }
}
class BigDataError extends Error {
    constructor(errMsg = BIG_DATA) {
        super(errMsg);
    }
}

export class HttpServer extends EventEmitter {
    constructor(private config: IConfig, private app: any, private token: string) {
        super();
        this.httpServer();
    }

    private httpServer() {
        this.app.use((err: Error, req: any, res: any, next: any) => {
            console.log(err.stack);
            return error(res, 500, SYSTEM_ERROR);
        });

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
                    arguard.string(req.body.sessionId, "sessionID").nonempty();
                    if (this.isWrongdSession(req.sessionID, req.body.sessionId)) {
                        throw new SequenceError();
                    }
                }
                catch (err) {
                    if (err instanceof SequenceError) {
                        return error(res, 400, err.message);
                    }
                    return error(res, 400, WRONG_FORMAT);
                }
            }
            catch (err) {
                return error(res, 500, SYSTEM_ERROR);
            }
            return resultOk(res, {token: this.token});
        });

        this.app.post("/upload", async (req: any, res: any) => {
            try {
                try {
                    await this.checkParameterUpload(req);
                    let currentSize: number = await uploadDataInFile(req.sessionID, req.body.fileName,
                                                                        req.body.data, req.body.sizeOfFile);
                    if (currentSize === req.body.sizeOfFile) console.log("end file");
                    return resultOk(res);
                }
                catch (err) {
                    if (err instanceof SequenceError) {
                        return error(res, 400, err.message);
                    }
                    else if (err instanceof BigDataError) {
                        return error(res, 401, err.message);
                    }
                    return error(res, 400, WRONG_FORMAT);
                }
            } catch (error) {
                console.log("error");
            }
        });

        this.app.all((req: any, res: any) => {
            return error(res, 400, WRONG_FORMAT);
        });

        this.app.listen(this.config.httpPort, () => {
            console.log("\x1b[36m", `Server is listening on ${this.config.httpPort}\n`);
            console.log("\x1b[37m", "");
        });
    }
    private async checkParameterUpload(req: any) {
        arguard.string(req.body.sessionId, "sessionID").nonempty();
        arguard.string(req.body.data, "data").nonempty();
        arguard.string(req.body.fileName, "fileName").nonempty();
        arguard.number(req.body.sizeOfFile, "sizeOfFile").positive();
        if (this.isWrongdSession(req.sessionID, req.body.sessionId)) {
            throw new SequenceError();
        }

        const fileSizeBytes = Math.round((JSON.stringify(req.body.data).length / 4) * 3);
        if ((req.body.sizeOfFile < fileSizeBytes) || (req.body.sizeOfFile ===
                fileSizeBytes)) throw new Error();
        if (fileSizeBytes > MAX_DATA_SIZE) {
            throw new BigDataError();
        }
    }
    private isWrongdSession(systemSessionId: string, userSessionId: string): boolean {
        if (systemSessionId !== userSessionId) {
            return true;
        }

        return false;
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