import express from "express";
import forumRoutes from "./routes/forum.routes";
import conversationRoutes from "./routes/conversation.routes";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/forums", forumRoutes);
app.use("/api/conversations", conversationRoutes);

setupSwagger(app);

export default app;
