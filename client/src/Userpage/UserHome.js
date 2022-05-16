import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Outlet, Link } from "react-router-dom";

import "./base.css";

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <div className="UserHome">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(2).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/userHome/editProfile">
                <button>Edit Profile</button>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/userHome/changePassword">
                <button>Change Password</button>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/userHome/manageList">
                <button>Add new list</button>
              </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link to="/">
                <button>Back to home page</button>
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </div>
  );
}
