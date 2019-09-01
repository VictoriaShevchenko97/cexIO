"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseClient_1 = require("../BaseClient");
const fileUpload_1 = require("./lib/fileUpload");
const path_1 = require("path");
const request = require("request-with-cookies");
class ClientA extends BaseClient_1.BaseClient {
    constructor() {
        super();
        this.fullFileName = path_1.join(__dirname, "../", "tolstoy.txt");
        this.clientRequest = request.createClient();
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionId = yield this.loginClient(this.clientRequest);
            this.currentSessionId = sessionId;
            return Promise.resolve();
        });
    }
    uploadBigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.login();
            const fileObj = fileUpload_1.create(this.fullFileName);
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
        });
    }
}
const clientA = new ClientA();
clientA.uploadBigFile();
