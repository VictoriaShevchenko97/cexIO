"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const events_1 = require("events");
class FileHelper extends events_1.EventEmitter {
    constructor(fullFileName) {
        super();
        this.fullFileName = fullFileName;
    }
    checkFileSize() {
        if (!fs.existsSync(this.fullFileName)) {
            throw new Error(`File ${this.fullFileName} is not exist`);
        }
        let fileSize = fs.statSync(this.fullFileName).size; // in Bytes
        return fileSize;
    }
    partialReadingFile() {
        const stream = fs.createReadStream(this.fullFileName, { encoding: "utf-8", flags: "r" });
        stream.on("data", (data) => {
            this.emit("chunk", (data).toString());
        });
        stream.on("end", () => {
            this.emit("end");
        });
    }
}
function create(fullFileName) {
    return new FileHelper(fullFileName);
}
exports.create = create;
