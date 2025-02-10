import { useState } from "react";
import { Button, Form, Input, Flex } from "antd";
import { useNavigate } from "react-router";
import { login, getPublicKey } from "@/request";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { encodeByRAS, encodeByMD5 } from "@/utils/forge";
import "./index.less";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const loginFn = () => {
    form
      .validateFields()
      .then(async () => {
        const publicKeyPem = await getPublicKey();
        if (publicKeyPem) {
          const hash = encodeByMD5(password);
          const encodePassword = encodeByRAS(publicKeyPem.data, hash);
          const res = await login(account, encodePassword);
          if (res) {
            localStorage.setItem("token", res.data);
            navigate("/");
          }
        }
      })
      .catch(() => {});
  };

  return (
    <div className="login-form">
      <Form form={form}>
        <Form.Item
          name="account"
          rules={[{ required: true, message: "请输入账号!" }]}>
          <Input
            prefix={<UserOutlined />}
            placeholder="账号"
            onChange={(e) => {
              setAccount(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}>
          <Input
            prefix={<LockOutlined />}
            placeholder="密码"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" onClick={loginFn}>
            登录
          </Button>
        </Form.Item>
      </Form>
      <Flex justify="space-between" align="center">
        <span
          className="login-form-text-btn"
          onClick={() => {
            navigate("/register");
          }}>
          注册
        </span>
        <span className="login-form-text-btn">忘记密码？</span>
      </Flex>
    </div>
  );
};

const Login = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default Login;
