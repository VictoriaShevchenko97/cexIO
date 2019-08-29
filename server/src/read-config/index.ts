// читает конфиг модуля из config.json
const fs = require("fs");
const arguard = require("arguard");

export interface IConfig {
    httpPort: number;
    wsPort: number;
}

export function readConfig(path: string) {
    const data = fs.readFileSync(path);
    const conf = JSON.parse(data);
    arguard.object(conf, "config");
    arguard.number(conf.httpPort, "config.httpPort").positive();
    arguard.number(conf.wsPort, "config.wsPort").positive();
    return conf;
}
