import app from "./app";
import connectDB from "./config/db";
import { connectToBroker } from "./utils/message-broker";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  // await connectToBroker();

  app.listen(PORT, () => {
    console.log(`Forum Service running at http://localhost:${PORT}`);
  });
};

start();
