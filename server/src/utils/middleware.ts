import { Request, Response, NextFunction } from "express";
import { verifyToken, returnErrResponese, EErrorCode } from "@/utils/common";

const whiteList = ["/login"];
export const handleToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (whiteList.includes(req.path)) {
    next();
  } else {
    const obj = await verifyToken(
      req.headers.authorization?.substring(7) ?? ""
    ).catch(() => {
      res.send(returnErrResponese(EErrorCode.TOKEN_WRONG));
    });
    if (obj) {
      next();
    }
  }
};
