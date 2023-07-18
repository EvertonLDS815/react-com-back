import { Route, Routes } from "react-router-dom";

import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Nos from "../pages/Nos";

function router() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/nos" element={<Nos />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default router;
