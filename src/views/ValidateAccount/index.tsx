/**
 * @author        yimmm <1161384816@qq.com>
 * @date          2025-02-18 22:37:09
 * Copyright © YourCompanyName All rights reserved
 */
import { Navigate } from "react-router";
import { useState } from "react";
const ValidateAccount = () => {
  const userExists = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("user="));
  const accountExists = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("account="));
  const account = decodeURIComponent(
    document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("account="))
      ?.substring(9) ?? ""
  );
  const [acount] = useState(account);
  if (userExists && accountExists) {
    return <div>{`验证码已发至${acount}`}</div>;
  }
  return <Navigate to="/" />;
};

export default ValidateAccount;
