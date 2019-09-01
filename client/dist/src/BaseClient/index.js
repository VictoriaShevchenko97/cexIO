"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseClient {
    constructor() {
        this.fullUrl = `http://127.0.0.1:3000`;
    }
    loginClient(request) {
        return new Promise((resolve, reject) => {
            request({
                url: this.fullUrl + "/login",
                method: "POST"
            }, (err, httpResp, body) => {
                if (err) {
                    reject(err);
                }
                let resp;
                try {
                    resp = JSON.parse(body);
                    return resolve(resp.data.sessionId);
                }
                catch (err) {
                    reject(err.stack);
                }
            });
        });
    }
}
exports.BaseClient = BaseClient;
