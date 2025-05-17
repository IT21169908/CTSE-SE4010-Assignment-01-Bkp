import "dotenv/config";
import express from "express";
import cors from 'cors';
import proxy from "express-http-proxy";
import morgan from "morgan";
import {setupSwagger} from "./swagger";

const isProduction = process.env.NODE_ENV === "production";
const port = parseInt(process.env.PORT || '80', 10);
console.log(".env port fetched as: " + port);

const app = express();


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

// Setup Swagger UI at /docs before API routes
setupSwagger(app);

// API proxy routes
app.use("/api/auth", proxy(process.env.AUTH_BASE_URL || "http://localhost:8001"));
app.use("/api/course", proxy(process.env.COURSE_BASE_URL || "http://localhost:8002"));
app.use("/api/forum", proxy(process.env.LMS_BASE_URL || "http://localhost:8003"));
app.use("/api/notification", proxy(process.env.NOTIF_BASE_URL || "http://localhost:8004"));


app.get('/', (req, res) => {
    const gatewayUrl = process.env.GATEWAY_URL || "http://localhost:80";
    const json = {
        name: "Gateway™ API",
        documentation: `${gatewayUrl}/docs`,
        services: {
            auth: {
                base_url: process.env.AUTH_BASE_URL || "http://localhost:8001",
                proxy_url: `${gatewayUrl}/api/auth`,
            },
            courses: {
                base_url: process.env.COURSE_BASE_URL || "http://localhost:8002",
                proxy_url: `${gatewayUrl}/api/course`,
            },
            lms: {
                base_url: process.env.LMS_BASE_URL || "http://localhost:8003",
                proxy_url: `${gatewayUrl}/api/forum`,
            },
            notifications: {
                base_url: process.env.NOTIF_BASE_URL || "http://localhost:8004",
                proxy_url: `${gatewayUrl}/api/notification`,
            },
        }
    };
    res.status(200).json(json);
});

app.listen(port, () => {
    console.log("Gateway is Listening to Port 80");
});
