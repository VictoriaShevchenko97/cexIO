import * as fs from "fs";
import { EventEmitter } from "events";

class FileHelper extends EventEmitter {
    constructor(private fullFileName: string) {
        super();
    }

    public checkFileSize(): number {
        if (! fs.existsSync(this.fullFileName)) {
            throw new Error(`File ${this.fullFileName} is not exist`);
        }
        let fileSize = fs.statSync(this.fullFileName).size; // in Bytes
        return fileSize;
    }

    public partialReadingFile() {
        const stream = fs.createReadStream(this.fullFileName, { encoding: "utf-8", flags: "r" });
        stream.on("data", (data) => {
            this.emit("chunk", (data).toString());
        });
        stream.on("end", () => {
            this.emit("end");
        });
    }

}

export function create (fullFileName: string) {
    return new FileHelper(fullFileName);
}