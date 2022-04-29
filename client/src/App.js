import React from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./checkout/Checkout";

function Test() {
  return <h1>Hello World!</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/helloworld" element={<Test />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;