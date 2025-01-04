export interface IUser {
  name: string;
  account: string;
  password: string;
  role: number
}

export interface ITokenParam {
  account: string;
  name: string;
}

export interface ITokenResult extends ITokenParam {
  iat: number;
  exp: number;
}

export interface IUserReq {
  account: string;
  password: string;
}
