
export class BaseClient {
    public fullUrl = `http://127.0.0.1:3000`;

    loginClient(request: any): Promise<string> {
        return new Promise((resolve, reject) => {
            request({
                url: this.fullUrl + "/login",
                method: "POST"
            }, (err: Error, httpResp: any, body: any) => {
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

