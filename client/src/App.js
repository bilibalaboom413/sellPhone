import React from "react";
import { Routes, Route } from "react-router-dom";

function Test() {
  return <h1>Hello World!</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/helloworld" element={<Test />} />
    </Routes>
  );
}

export default App;
