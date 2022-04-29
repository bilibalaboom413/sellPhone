import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./checkout/Checkout";
import Home from "./Home";
import Layout from "./Layout";

// const App = () => {
//   return (
//     <BrowserRouter className="App">
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="checkout" element={<Checkout />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };
// import { Routes, Route } from "react-router-dom";

function Test() {
  return <h1>Hello World!</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/helloworld" element={<Test />} />
      <Route paht="./checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
