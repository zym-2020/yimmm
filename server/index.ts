import express, { Request, Response } from "express";
import { returnResponse } from "./utils/common";
const app = express();
const port = 8080;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/login", (req: Request, res: Response) => {
  console.log(req.body);
  res.send(returnResponse(null));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
