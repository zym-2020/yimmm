import express, { Request } from "express";
import {
  returnResponse,
  generateToken,
  returnErrResponese,
  EErrorCode,
  RASDecode,
  RASEncode,
} from "@/utils/common";
import { sendValidateCode, generateValidateCode } from "@/utils/email";
import { ICustomRequest, IUserReq, IRegisterReq, IUser } from "@/interface";
import { queryUserByAccount, addUser } from "@/dao/user-dao";
import { addValidateCode } from "@/dao/validate-code-dao";

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
  const decodePassword = RASDecode(req.body.password);
  const userJsonString = JSON.stringify({
    // ...req.body,
    password: decodePassword,
  });

  // await addUser({ ...req.body, password: decodePassword }).catch((e) => {
  //   console.log(e);
  //   res.send(returnErrResponese(EErrorCode.DEFAULT_EXCEPTION));
  //   return;
  // });
  res.cookie("user", RASEncode(userJsonString), {
    maxAge: 1000 * 60 * 3,
  });
  res.cookie("account", req.body.account, {
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

router.post("/validateAccount", async (req: Request, res) => {
  const cookies = req.cookies;
  const account: string = cookies["account"];
  const encodeUserString: string = cookies["user"];
  const userJsonString = RASDecode(encodeUserString);
  const user: IRegisterReq = JSON.parse(userJsonString);
});

export default router;
