import { Request } from "express";
import * as core from "express-serve-static-core";

export interface IUser {
  name: string;
  account: string;
  password: string;
  role: number;
}

export interface ITokenParam {
  account: string;
  name: string;
}

export interface ICustomRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  customParams?: ITokenParam;
}

export interface ITokenResult extends ITokenParam {
  iat: number;
  exp: number;
}

export interface IUserReq {
  account: string;
  password: string;
}
