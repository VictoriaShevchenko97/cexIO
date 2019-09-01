import { BaseClient } from "../BaseClient";
let request = require("request-with-cookies");

class ClientB extends BaseClient {
    private currentSessionId: string;
    private clientReq: any;
    constructor() {
        super();
        this.clientReq = request.createClient();
        (async() => {
            const sessionId: string = await this.loginClient(this.clientReq);
            this.currentSessionId = sessionId;
        })();
    }
}