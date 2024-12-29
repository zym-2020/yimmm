import { Button } from "antd";
import { useNavigate } from "react-router";
import { login } from "@/require";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>登录页</div>
      <Button
        onClick={async () => {
          const res = await login("yimmmzhang", "123");
          if (res && res.code === 0) {
            localStorage.setItem("token", "yimmmzhang");
            navigate("/");
          }
        }}>
        登录
      </Button>
    </>
  );
};

export default Login;
