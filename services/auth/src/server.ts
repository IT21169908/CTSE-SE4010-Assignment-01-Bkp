import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import expressApp from "./app";
import databaseSetup from "./bootstrap/database";
import {AppLogger} from "./utils/logging";
import startupPassport from "./bootstrap/passport";
import {ListenOptions} from "node:net";

const startServer = async () => {
    const app = await expressApp();

    const isProduction = process.env.NODE_ENV === "production";
    const port = parseInt(process.env.PORT || '8001', 10);
    const host = '0.0.0.0';
    console.log(".env port fetched as: " + port);

    let server: https.Server | http.Server;

    console.log("isProduction : " + isProduction)
    if (isProduction) {
        server = https.createServer({
            key: fs.readFileSync(process.env.SERVER_KEY_PATH || 'server.key'),
            cert: fs.readFileSync(process.env.SERVER_CERT_PATH || 'server.cert')
        }, app);
    } else {
        server = new http.Server(app);
    }
    const listenOptions: ListenOptions = {
        port,
        host: '0.0.0.0',
    };
    databaseSetup().then(() => {
        AppLogger.info('--> Mongoose connected!');
        console.log('--> Mongoose connected!');
        startupPassport(app).then(() => {
            AppLogger.info('--> Passport started!');
            server.listen(listenOptions, () => {
                AppLogger.info('--> HTTPS Server successfully started at port: ' + port);
                console.log('--> HTTPS Server successfully started at port: ' + port);
            });
        }).catch(console.error);
    }).catch(console.error);
}

startServer();
