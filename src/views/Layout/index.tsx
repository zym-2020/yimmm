import { Layout } from "antd";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

const { Header, Footer, Content } = Layout;

const CustomLayout = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <Header>
        <button onClick={() => {
          navigate("/profile")
        }}>按钮</button>
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default CustomLayout;
