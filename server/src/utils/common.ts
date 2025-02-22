import { privateDecrypt, publicEncrypt, constants } from "crypto";
import { ITokenParam, ITokenResult } from "@/interface";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export enum EErrorCode {
  DEFAULT_EXCEPTION = -1, // 默认的服务器内部异常，我并不想进行处理！！
  NO_OBJECT = -2, // 没有对应的对象
  EXIST_OBJECT = -3, // 对象已存在
  NO_TOKEN = -4, // Missing Token
  TOKEN_WRONG = -5, // Token Wrong
  USER_PASSWORD_NOT_MATCH = -6, // 账户名和密码不匹配
  QUERY_TYPE_ERROR = -7, // 查询类型不支持
  REMOTE_SERVICE_ERROR = -8, // 远程服务调用出错
  DUPLICATE_NAME_ERROR = -9, // 文件重名
  DATASOURCE_ERROR = -10, // 数据源错误
  NO_ACCESS = -11, // 没有权限
  INVALID_VERIFICATION_CODE = -12
}

export const returnResponse = <T>(
  data: T,
  msg = ""
): { code: number; data: T; msg: string } => {
  return {
    code: 0,
    data,
    msg,
  };
};

export const returnErrResponese = (code: number, msg?: string) => {
  if (msg !== undefined && msg !== null) {
    return { code, msg };
  }
  switch (code) {
    case EErrorCode.DEFAULT_EXCEPTION:
      return { code, msg: "默认的服务器内部异常，我并不想进行处理" };
    case EErrorCode.NO_OBJECT:
      return { code, msg: "没有对应的对象" };
    case EErrorCode.EXIST_OBJECT:
      return { code, msg: "对象已存在" };
    case EErrorCode.NO_TOKEN:
      return { code, msg: "Missing Token" };
    case EErrorCode.TOKEN_WRONG:
      return { code, msg: "Token Wrong" };
    case EErrorCode.USER_PASSWORD_NOT_MATCH:
      return { code, msg: "账户名和密码不匹配" };
    case EErrorCode.QUERY_TYPE_ERROR:
      return { code, msg: "查询类型不支持" };
    case EErrorCode.REMOTE_SERVICE_ERROR:
      return { code, msg: "远程服务调用出错" };
    case EErrorCode.DUPLICATE_NAME_ERROR:
      return { code, msg: "文件重名" };
    case EErrorCode.DATASOURCE_ERROR:
      return { code, msg: "数据源错误" };
    case EErrorCode.NO_ACCESS:
      return { code, msg: "没有权限" };
    case EErrorCode.INVALID_VERIFICATION_CODE:
      return { code, msg: "无效验证码" }
    default:
      return { code, msg: "" };
  }
};

export const generateToken = (param: ITokenParam) => {
  const secretKey = "yimmm";
  return jwt.sign(param, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return new Promise<ITokenResult>((resolve, reject) => {
    jwt.verify(token, "yimmm", (err, decode) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        reject();
      }
      resolve(decode as ITokenResult);
    });
  });
};

export const RASDecode = (data: string) => {
  const filePath = path.resolve(__dirname, "../config/privateKey.pem");
  const privateKey = fs.readFileSync(filePath, "utf-8");
  // const encrypt = new JSEncrypt();
  // encrypt.setPrivateKey(privateKey)
  // return encrypt.decrypt(data)
  return privateDecrypt(privateKey, Buffer.from(data, "base64")).toString();
};

export const RASEncode = (data: string) => {
  const filePath = path.resolve(__dirname, "../config/publicKey.pem");
  const publicKey = fs.readFileSync(filePath, "utf-8");
  return publicEncrypt(
    {
      key: publicKey,
    },
    Buffer.from(data, "utf-8")
  ).toString("base64");
};
