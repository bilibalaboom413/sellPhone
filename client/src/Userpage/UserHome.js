import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Outlet, Link} from 'react-router-dom'

import './base.css'



const { Header, Content, Footer } = Layout;



//引入模块，
//const express=require('express');
//引入mongoose库
/* const mongoose=require('mongoose');
const DB_URL="mongodb://localhost:27017/COMP5347";
mongoose.connect(DB_URL);

mongoose.connection.on('connected',function(){
  console.log("链接成功");
});
 */





export default function App() {

   

  return (
    <div>
      
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(2).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}
      />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
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
        
     
        
        <Breadcrumb.Item>User Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
      
          
          <Outlet/>
          </div>
        
    </Content>
  
  </Layout>
    </div>
  )
}
