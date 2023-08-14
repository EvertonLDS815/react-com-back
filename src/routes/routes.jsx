import { Route, Routes } from "react-router-dom";

import DefaultLayout from "../layout/DefaultLayout";
import Products from "../pages/Products";
import Home from "../pages/Home";

function router() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default router;
