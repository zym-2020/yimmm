import { Button } from "antd";
import { useNavigate } from "react-router";
import { login } from "@/request";


const Login = () => {
  const navigate = useNavigate();
  const loginFn = async () => {
    const res = await login("1161384816@qq.com", "123");
    if (res) {
      localStorage.setItem("token", res.data);
      navigate("/");
    }
  };
  const clickHandle = () => {
    loginFn()
  }
  return (
    <>
      <div>登录页</div>
      <Button onClick={clickHandle}>登录</Button>
    </>
  );
};

export default Login;
