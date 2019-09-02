import * as fs from "fs";
import { join } from "path";

export function uploadDataInFile(fileName: string, data: string, originSize: number): Promise<number> {
    return new Promise((resolve, reject) => {
        try {
            const fullFileName = join(__dirname + "/files", fileName);
            if (! fs.existsSync(fullFileName)) {
                fs.closeSync(fs.openSync(fullFileName, "a"));
            }
            let currentSize = (fs.statSync(fullFileName)).size;
            if (originSize !== currentSize) {
                fs.appendFileSync(fullFileName, data);
                currentSize = (fs.statSync(fullFileName)).size;
            }
            resolve(currentSize);
        } catch (error) {
            reject(error);
        }
    });
}
