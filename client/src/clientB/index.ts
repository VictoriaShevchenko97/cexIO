import { BaseClient } from "../BaseClient";
import * as arguard from "arguard";
import WebSocket from "ws";
let request = require("request-with-cookies");

interface IUploadData {
    currentSize: number;
    userSize: number;
    fileName: string;
}

class ClientB extends BaseClient {
    private currentSessionId: string;
    private clientRequest: any;
    private ws: WebSocket;

    constructor() {
        super();
        this.clientRequest = request.createClient();
        this.initConnection();
    }

    private async initConnection() {
        const sessionId: string = await this.loginClient(this.clientRequest);
        this.currentSessionId = sessionId;
        let token = await this.getToken();
        this.ws = new WebSocket(`ws://${this.config.host}:${this.config.wsPort}/?token=${token}`);

        this.ws.on("open", () => {
            console.log("Socket opened");
        });

        this.ws.on("close", () => {
            console.log("Server closed");
        });

        this.ws.on("message", (data: any) => {
            let event = JSON.parse(data);

            if (event.type === "upload") {
                let uploadData: IUploadData = event.message;
                try {
                    arguard.string(uploadData.fileName, "fileName").nonempty();
                    arguard.number(uploadData.currentSize, "currentSize").positive();
                    arguard.number(uploadData.userSize, "userSize").positive();

                    let isEnded = this.isEqualSizeFile(uploadData.currentSize, uploadData.userSize);
                    if (isEnded) console.log(uploadData.fileName + " saved!!!");
                } catch (error) {
                    console.log("WRONG_FORMAT " + error.stack);
                }
            }
        });

        this.ws.on("error", (err: Error) => {
            console.error(err.stack);
        });
    }

    private getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            const req = {
                url: this.fullUrl + "/subscribe",
                method: "POST",
                json: true,
                body: {
                    sessionId: this.currentSessionId
                }
            };

            this.clientRequest(req, (err: Error, httpResp: any, body: any) => {
                if (err) reject(err.stack);
                try {
                    arguard.string(body.data.token, "token").nonempty();
                    resolve(body.data.token);
                } catch (err) {
                    reject(err.stack);
                }
            });
        });
    }

    private isEqualSizeFile(currentSize: number, userSize: number): boolean {
        return (currentSize === userSize);
    }
}

const clientB = new ClientB();