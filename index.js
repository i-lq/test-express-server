import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import ExpressJS from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
let __dirname = path.dirname(fileURLToPath(import.meta.url));
import dotenv from "dotenv";
dotenv.config();

const AppExpress = ExpressJS();


let Config = {
    debug: false,
    canary: true,
    port: process.env.PORT || 3535,
    getUrl: () => {
        return 'http://localhost:3535/';
    }
};

if (Config.port === 3535) {
    Config.debug = true;
};

console.log(`Hey! I'll use this port ${Config.port}`);

AppExpress.use(cors());
AppExpress.use(morgan('combined'));
AppExpress.use(bodyParser.urlencoded({ extended: false }));
AppExpress.use(bodyParser.json());

var Server = AppExpress.listen(Config.port, (err) => {
    if (err) {
        console.error(`Error opening server`, err);
        return;
    };
    console.log(`Open server on port ${Config.port} -> http://localhost:${Config.port}/`);
});

AppExpress.get(`/`, (req, res) => {
    res.send({
        msg: `Hi Jarlini`
    });
});