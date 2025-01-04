import express, { Request } from "express";
import {
  returnResponse,
  generateToken,
  returnErrResponese,
  EErrorCode,
} from "@/utils/common";
import { IUserReq } from "@/interface";
import { queryUserByAccount } from "./user-dao";

const router = express.Router();

router.post("/login", async (req: Request<any, any, IUserReq>, res) => {
  const user = await queryUserByAccount(req.body.account).catch((err) => {
    console.log("err", err);
    res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
    return;
  });
  if (user && user.rows.length > 0) {
    if (user.rows[0].password !== req.body.password)
      res.send(returnErrResponese(EErrorCode.USER_PASSWORD_NOT_MATCH));
    else
      res.send(
        returnResponse(
          generateToken({
            account: user.rows[0].account,
            name: user.rows[0].name,
          })
        )
      );
  } else {
    res.send(returnErrResponese(EErrorCode.NO_OBJECT));
  }
});

export default router;
