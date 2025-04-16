/// <reference path="global.d.ts" />
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import favicon from 'serve-favicon';
import * as favPath from 'path';

const expressApp = async () => {
    const isProduction = process.env.NODE_ENV === "production";
    const API_URL_PREFIX = process.env.API_URL_PREFIX ?? "/";
    const app = express();
    const router = express.Router()



    app.use(express.json({limit: '20mb'}));
    app.use(express.urlencoded({limit: '20mb', extended: true}));

    if (!isProduction) {
        app.use(morgan("dev"));
        app.use(cors({
            optionsSuccessStatus: 200,
            origin: '*',
            allowedHeaders: ['Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With', 'Cache-Control']
        }));
    } else {
        app.use(morgan('combined'));
        app.use(cors());
    }


    router.use(favicon(favPath.join(__dirname, "../resources", "favicons/favicon.ico")));
    router.use('/static', express.static(favPath.join(__dirname, "../resources")));



    app.use(API_URL_PREFIX, router);


    return app;
}


export default expressApp;
