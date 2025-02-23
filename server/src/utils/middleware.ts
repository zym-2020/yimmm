import { Response, NextFunction } from "express";
import { verifyToken, returnErrResponese, EErrorCode } from "@/utils/common";
import { ICustomRequest } from "@/interface";

const whiteListRegs = [
  /^\/validateAccount\/([^/]+)$/,
  /^\/login$/,
  /^\/getPublicKey$/,
  /^\/register$/,
];
export const handleToken = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  const filter = whiteListRegs.filter((item) => item.test(req.path));
  if (filter.length > 0) {
    next();
  } else {
    const obj = await verifyToken(
      req.headers.authorization?.substring(7) ?? ""
    ).catch(() => {
      res.send(returnErrResponese(EErrorCode.TOKEN_WRONG));
    });
    if (obj) {
      req.customParams = obj;
      next();
    }
  }
};
