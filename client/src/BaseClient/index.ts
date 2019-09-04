import { readConfig, IConfig } from "../../lib/read-config";
import { join } from "path";
import { ServerResponse } from "http";

export class BaseClient {
    protected config: IConfig;
    public fullUrl: string;

    constructor() {
        try {
            this.config = readConfig(join(__dirname, "../", "/config.json"));
            this.fullUrl = `http://${this.config.host}:${this.config.httpPort}`;
        } catch (e) {
            console.log(e.stack);
            process.exit(1);
        }
    }

    loginClient(request: any): Promise<string> {
        return new Promise((resolve, reject) => {
            request({
                url: this.fullUrl + "/login",
                method: "POST"
            }, (err: Error, httpResp: ServerResponse, body: any) => {
                if (err) {
                    reject(err);
                }
                let resp;
                try {
                    resp = JSON.parse(body);
                    return resolve(resp.data.sessionId);
                } catch (err) {
                    reject(err.stack);
                }
            });
        });
    }
}

