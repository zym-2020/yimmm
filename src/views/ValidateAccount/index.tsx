/**
 * @author        yimmm <1161384816@qq.com>
 * @date          2025-02-18 22:37:09
 * Copyright © YourCompanyName All rights reserved
 */
import { Navigate } from "react-router";
import { IRegisterFormReq } from "@/interface";
const ValidateAccount = () => {
  const userJsonString = decodeURIComponent(
    document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("user="))
      ?.substring(6) ?? ""
  );
  if (userJsonString) {
    console.log(userJsonString)
    const user: IRegisterFormReq = JSON.parse(userJsonString);
    return <div>
      <div>{`验证码已发至${user.account}`}</div>
      <div>
        
      </div>
    </div>;
  }
  return <Navigate to="/" />;
};

export default ValidateAccount;
