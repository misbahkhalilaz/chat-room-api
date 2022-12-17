import express from "express";
import cors from "cors";
import "./models";
import { connectDB } from "./utils/db.util";
import { AuthRouter } from "./routes/auth.route";
import bodyParser from "body-parser";

const mountServer = async () => {
  await connectDB();
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(bodyParser.json());

  app.use(cors());

  app.use("/auth", AuthRouter);

  app.listen(port, () => {
    console.log(`⚡️ Server running at http://localhost:${port}`);
  });
};

mountServer();
