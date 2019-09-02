import { BaseClient } from "../BaseClient";
let request = require("request-with-cookies");

const WebSocket = require("ws");

interface IUploadData {
    currentSize: number;
    userSize: number;
    fileName: string;
}

class ClientB extends BaseClient {
    private currentSessionId: string;
    private clientRequest: any;
    private ws: any;

    constructor() {
        super();
        this.clientRequest = request.createClient();
        (async() => {
            const sessionId: string = await this.loginClient(this.clientRequest);
            this.currentSessionId = sessionId;
            let token = await this.getToken();
            this.initConnection(token);
        })();
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
                    resolve(body.data.token);
                } catch (err) {
                    reject(err.stack);
                }
            });
        });
    }

    private initConnection(token: string) {
        this.ws = new WebSocket(`ws://${this.config.host}:${this.config.wsPort}/?token=${token}`);
        this.ws.on("open", (ws: any) => {
            console.log("opened");
        });
        this.ws.on("message", (data: any) => {
            let event = JSON.parse(data);
            if (event.type === "upload") {
                let uploadData: IUploadData = event.message;
                let isEnded = this.isEqualSizeFile(uploadData.currentSize, uploadData.userSize);
                if (isEnded) console.log(uploadData.fileName + " saved!!!");

                this.ws.send(JSON.stringify({tag: "uploadResult", fileName: uploadData.fileName, end: isEnded}));
            }
        });

        this.ws.on("error", (err: Error) => {
            console.log(err.stack);
        });
    }
    private isEqualSizeFile(currentSize: number, userSize: number): boolean {
        if (currentSize === userSize) {
            return true;
        }
        else {
            return false;
        }
    }
}

const clientB = new ClientB();