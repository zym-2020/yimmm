export interface IUser {
  name: string;
  account: string;
  password: string;
}

export interface ITokenParam {
  account: string;
  name: string;
}

export interface ITokenResult extends ITokenParam {
  iat: number;
  exp: number;
}
