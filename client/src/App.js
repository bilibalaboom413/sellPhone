import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Sign/register";
import Reset from "./Sign/reset";
import Reset2 from "./Sign/reset2";
import Login from "./Sign/signin";
import Checkout from "./checkout/Checkout";
import Homepage from "./Homepage/Homepage";
import Info from "./Homepage/Info";
import Activation from "./Sign/activation";

import UserHome from './Userpage/UserHome'
import ChangePassword from './Userpage/ChangePassword'
import EditProfile from './Userpage/EditProfile'
import ManageList from './Userpage/ManageList'
import AddList from './Userpage/AddList'

function Test() {
  return <h1>Hello World!</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/helloworld" element={<Test />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/:id" element={<Activation />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/reset/:id" element={<Reset2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/addreview" element={<Info />} />
      <Route path="/checkout" element={<Checkout />} />

      
      <Route path='/userHome' element={<UserHome/>}></Route>
        <Route path='/editProfile' element={<EditProfile/>}></Route>
        <Route path='/manageList' element={<ManageList/>}></Route>
        <Route path='/changePassword' element={<ChangePassword/>}></Route>
        <Route path='/addList' element={<AddList/>}></Route>
      
    </Routes>
  );
}

export default App;
