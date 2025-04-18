import express from "express";
import forumRoutes from "./routes/forum.routes";
import conversationRoutes from "./routes/conversation.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/forum", forumRoutes);
app.use("/api/conversations", conversationRoutes);

export default app;
