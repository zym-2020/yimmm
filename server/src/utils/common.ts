import { ITokenParam, ITokenResult } from "@/interface";
import jwt from "jsonwebtoken";

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
