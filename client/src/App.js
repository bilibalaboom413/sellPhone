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
    </Routes>
  );
}

export default App;
