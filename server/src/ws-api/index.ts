import { Server } from "ws";
import { EventEmitter } from "events";
import { IConfig } from "../read-config";
import { signedCookie } from "cookie-parser";
import * as cookie from "cookie";
import { sign, verify } from "jsonwebtoken";

export class WSSocketProcessor extends EventEmitter {
    private wss: Server;
    private token: string;
    constructor(private conf: IConfig) {
        super();
        this.wss = new Server({ port: this.conf.wsPort });
        this.token = sign({name: "CEX.IO"}, "hakuna-matata", {
            expiresIn : 10 * 24 * 60 * 60 * 1000 // 10 days
        });
    }

    public get _token(): string {
        return this.token;
    }

    public closeConnection() {
        this.wss.removeAllListeners();
        this.wss.close();
    }
}
