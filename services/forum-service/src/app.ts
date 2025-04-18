import express from "express";
import forumRoutes from "./routes/forum.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/forum", forumRoutes);

export default app;
