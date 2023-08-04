import { Route, Routes } from "react-router-dom";

import DefaultLayout from "../layout/DefaultLayout";
import Products from "../pages/Products";

function router() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/products" element={<Products />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default router;
