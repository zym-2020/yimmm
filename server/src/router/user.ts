import express, { Request } from "express";
import {
  returnResponse,
  generateToken,
  returnErrResponese,
  EErrorCode,
  RASDecode,
} from "@/utils/common";
import { sendValidateCode, generateValidateCode } from "@/utils/email";
import { ICustomRequest, IUserReq, IRegisterReq, IUser } from "@/interface";
import { queryUserByAccount, addUser } from "@/dao/user-dao";
import {
  addValidateCode,
  queryRecodeByAccountAndCode,
} from "@/dao/validate-code-dao";

const router = express.Router();

router.post("/login", async (req: Request<any, any, IUserReq>, res) => {
  const user = await queryUserByAccount(req.body.account).catch((err) => {
    console.log("err", err);
    res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
    return;
  });
  if (user && user.rows.length > 0) {
    try {
      const decodePassword = RASDecode(req.body.password);
      if (user.rows[0].password !== decodePassword)
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
    } catch (e) {
      console.log(e);
      res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
    }
  } else {
    res.send(returnErrResponese(EErrorCode.NO_OBJECT));
  }
});

router.get("/getUserInfo", async (req: ICustomRequest, res) => {
  if (req.customParams) {
    const account = req.customParams.account;
    const user = await queryUserByAccount(account).catch((err) => {
      console.log("err", err);
      res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
      return;
    });
    if (user && user.rows.length > 0)
      res.send(
        returnResponse({
          account: user.rows[0].account,
          name: user.rows[0].name,
          role: user.rows[0].role,
        })
      );
    else res.send(returnErrResponese(EErrorCode.NO_OBJECT));
    return;
  }
  res.send(returnErrResponese(EErrorCode.TOKEN_WRONG));
});

router.post("/register", async (req: Request<any, any, IRegisterReq>, res) => {
  const user = await queryUserByAccount(req.body.account).catch((err) => {
    console.log("err", err);
    res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
    return;
  });
  if (user && user.rows.length) {
    res.send(returnErrResponese(EErrorCode.EXIST_OBJECT));
    return;
  }
  const userJsonString = JSON.stringify(req.body);

  res.cookie("user", userJsonString, {
    maxAge: 1000 * 60 * 3,
  });
  const code = generateValidateCode();
  sendValidateCode(req.body.account, code);
  await addValidateCode({
    account: req.body.account,
    code: code,
    time: new Date().getTime(),
  }).catch((e) => {
    console.log(e);
  });
  res.send(returnResponse(null));
});

router.post("/validateAccount/:code", async (req: Request, res) => {
  const cookies = req.cookies;
  const userJsonString: string = cookies["user"];
  console.log(userJsonString);
  if (userJsonString) {
    try {
      const user: IRegisterReq = JSON.parse(userJsonString);
      const result = await queryRecodeByAccountAndCode(
        user.account,
        req.params.code
      ).catch((err) => {
        console.log("err", err);
        res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
        return;
      });
      if (result && result.rowCount === 1) {
        if (result.rows[0].time + 1000 * 60 * 5 > new Date().getTime()) {
          const decodePassword = RASDecode(user.password);
          await addUser({ ...user, password: decodePassword }).catch((e) => {
            console.log(e);
            res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
            return;
          });
          res.clearCookie("user");
          res.send(returnResponse(null));
          return;
        } else {
          res.send(returnErrResponese(EErrorCode.INVALID_VERIFICATION_CODE));
          return;
        }
      }
      res.send(returnErrResponese(EErrorCode.NO_OBJECT));
      return;
    } catch (e) {
      console.log(e);
      res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
      return;
    }
  }
  res.send(returnErrResponese(EErrorCode.NO_OBJECT));
});

export default router;
