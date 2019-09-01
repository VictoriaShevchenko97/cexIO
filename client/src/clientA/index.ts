import { BaseClient } from "../BaseClient";
import { create } from "./lib/fileUpload";
import { join } from "path";

const request = require("request-with-cookies");

class ClientA extends BaseClient {
    private currentSessionId: string;
    private clientRequest: any;       // for one session
    private fullFileName = join(__dirname, "../", "tolstoy.txt");

    constructor() {
        super();
        this.clientRequest = request.createClient();
    }

    async login() {
        const sessionId: string = await this.loginClient(this.clientRequest);
        this.currentSessionId = sessionId;
        return Promise.resolve();
    }

    async uploadBigFile() {
        await this.login();

        const fileObj = create(this.fullFileName);
        const bigFileSize = fileObj.checkFileSize();

        fileObj.partialReadingFile();
        fileObj.on("chunk", data => {
            const req = {
                url: this.fullUrl + "/upload",
                method: "POST",
                json: true,
                body: {
                    sessionId: this.currentSessionId,
                    data,
                    fileName: "name.txt",
                    sizeOfFile: bigFileSize
                }
            };
            this.clientRequest(req);
        });
        fileObj.on("end", () => console.log("\nFile sended to server"));
    }
}

const clientA = new ClientA();
clientA.uploadBigFile();

