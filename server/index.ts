require("module-alias/register");
import express, { Request, Response } from "express";
import { handleToken } from "@/utils/middleware";
import userRouter from "@/router/user";

const app = express();
const port = 8080;

app.use(express.json());
app.use(handleToken);
app.use(userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app.post("/login", (req: Request, res: Response) => {
//   console.log(req.body);
//   res.send(returnResponse(null));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});
