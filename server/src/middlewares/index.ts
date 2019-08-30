
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const RedisStore = require("connect-redis")(session);

import { createClient } from "redis";
import { IConfig } from "../read-config";
import { EventEmitter } from "events";

export class MiddleWares extends EventEmitter {
    private redisClient: any;
    private app: any;
    constructor(private config: IConfig) {
        super();
        try {
            this.redisClient = createClient(this.config.redisPort,
                            this.config.host);
                        }
        catch (err) {
            console.log("Please, start redis server");
        }
        this.app = express();
        (async() => {
            await this.configApp();
            this.initConnection();
        })();
    }

    public get _app(): string {
        return this.app;
    }

    private async configApp(): Promise<void> {
        // this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        const sessionStore =  new RedisStore({ host: this.config.host, port: this.config.redisPort, client: this.redisClient });
        this.app.use(new session({
            name: "sid",
            secret: "kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig",
            store: sessionStore,
            cookie: {
                secure: false,
                maxAge: 3600000
            },
            resave: false,
            saveUninitialized: false
        }));
        return Promise.resolve();
    }

    private initConnection() {
        this.redisClient.on("connect", () => {
            console.log("Connected to redis");
        });
        this.redisClient.on("error", (err: Error) => {
            console.log("Redis error encountered\n", err.stack);
            process.exit();
        });
        this.redisClient.on("end", () => {
            console.log("Redis connection closed");
        });
    }
    public stopRedisClient() {
        this.redisClient.end();
    }


}