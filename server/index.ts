require("module-alias/register");
import express, { Request, Response } from "express";
import cookieParser from 'cookie-parser'
import { handleToken } from "@/utils/middleware";
import userRouter from "@/router/user";
import commonRouter from '@/router/common'

const app = express();
const port = 8080;

app.use(cookieParser())
app.use(express.json());
app.use(handleToken);
app.use(userRouter);
app.use(commonRouter)

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
