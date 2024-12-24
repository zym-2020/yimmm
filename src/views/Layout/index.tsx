import { Layout } from "antd";
import { Outlet } from "react-router";

const { Header, Footer, Content } = Layout;

const CustomLayout = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default CustomLayout;
