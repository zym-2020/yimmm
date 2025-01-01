import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/common";

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
      console.log("token解析失败");
      res.send("xixixi");
    });
    if (obj) {
      next();
    }
  }
};
