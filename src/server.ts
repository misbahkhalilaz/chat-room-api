import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.post("/api/login", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️ Server running at http://localhost:${port}`);
});
