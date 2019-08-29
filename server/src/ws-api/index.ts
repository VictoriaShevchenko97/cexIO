import { Server } from "ws";
import { EventEmitter } from "events";
import { IConfig } from "../read-config";
import { signedCookie } from "cookie-parser";
import * as cookie from "cookie";

export class WSSocketProcessor extends EventEmitter {
    private wss: Server;
    constructor(private conf: IConfig) {
        super();
        this.wss = new Server({ port: conf.wsPort });
    }

    initializeConnect(): Promise<any> {
        return new Promise((resolve, reject) => {
            // const sid = signedCookie(cookie.parse(this.wss.listenerCount)connect.sid"], "$eCuRiTy");
            // console.info("sid -> ", sid);
            resolve(this.wss.listenerCount);
        });
    }
}

// exports.createSocket = (conf: IConfig) => {
//     return new WSSocketProcessor(conf);
// };