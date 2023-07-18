import { Route, Routes } from "react-router-dom";

import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Sobre from "../pages/Sobre";

function router() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/sobre" element={<Sobre />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default router;
