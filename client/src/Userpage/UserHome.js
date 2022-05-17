import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Outlet, Link } from "react-router-dom";

import "./base.css";

const { Content } = Layout;

export default function App() {
  return (
    <div className="UserHome">
      <Layout className="layout">
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
                <button>Add New List</button>
              </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link to="/">
                <button>Back to Homepage</button>
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
