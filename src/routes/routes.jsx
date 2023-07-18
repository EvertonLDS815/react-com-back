import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Sobre from "../pages/Sobre";
import Header from "../components/Header";

function router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/sobre" element={<Sobre />}></Route>
      </Routes>
    </>
  );
}

export default router;
