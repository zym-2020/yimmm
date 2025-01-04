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
          const res = await login("1161384816@qq.com", "123");
          if (res) {
            localStorage.setItem("token", res.data);
            navigate("/");
          }
        }}>
        登录
      </Button>
    </>
  );
};

export default Login;
