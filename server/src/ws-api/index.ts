import { Server } from "ws";
import { EventEmitter } from "events";
import { IConfig } from "../read-config";
import { parse } from "url";
import { sign, verify } from "jsonwebtoken";
const SECRET_KEY  = "hakuna-matata";

export class WSSocketProcessor extends EventEmitter {
    private wss: Server;
    private ws: any;
    private token: string;
    constructor(private conf: IConfig, httpServer: any) {
        super();
        this.token = sign({name: "CEX.IO"}, SECRET_KEY, {
            expiresIn : 10 * 24 * 60 * 60 * 1000 // 10 days
        });
        this.wss = new Server({
            port: 3001,
            verifyClient: (info, done) => {
                try {
                    let query = parse(info.req.url, true).query;
                    verify(query.token.toString(), SECRET_KEY, (err: Error) => {
                        if (err) throw err;
                        done(true);
                    });
                } catch (error) {
                    return done(false, 403, "Not valid token");
                }
            }
        });
        this.runListeners();
    }
    public sendMessage(data: any) {
        this.wss.clients.forEach((ws) => {
            ws.send(JSON.stringify ({
                type: "upload",
                message: data
            }));
        });
    }
    public runListeners() {
        this.wss.on("connection", (ws) => {
            this.ws = ws;
            console.log(" new connection");
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
