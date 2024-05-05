import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./page/Home";
import ProductsPage from "./page/ProductsPage";
import PATHS from "./contants/paths";
import OrderPage from "./page/OrderPage";
import AccountPage from "./page/AccountPage";
import UserPage from "./page/UserPage";
import OtherPage from "./page/OtherPage";
import ErrorPage from "./page/404Page";
import ProductDetailPage from "./page/ProductDetailPage";
import ProductNew from "./page/ProductDetailPage/ProductNew";
import CategoryPage from "./page/CategoryPage";
import OrderDetailPage from "./page/OrderPage/OrderDetailPage";
import Login from "./page/LoginPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import tokenMethod from "./utils/token";
import { handleGetProfile } from "./store/reducers/authReducer";
import PrivateRoute from "./component/PrivateRoute";
import NewAccount from "./page/AccountPage/NewAccount";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<PrivateRoute redirecPath={`/login`} />}>
            <Route index element={<HomePage />} />

            <Route path={PATHS.PRODUCT.INDEX} element={<ProductsPage />} />
            <Route path={PATHS.PRODUCT.DETAIL} element={<ProductDetailPage />} />
            <Route path={PATHS.PRODUCT.CATE} element={<CategoryPage />} />
            <Route path={PATHS.PRODUCT.NEW} element={<ProductNew />} />

            <Route path={PATHS.ORDER.INDEX} element={<OrderPage />} />
            <Route path={PATHS.ORDER.DETAIL} element={<OrderDetailPage />} />

            <Route path={PATHS.ACCOUNT.INDEX} element={<AccountPage />} />
            <Route path={PATHS.ACCOUNT.NEW} element={<NewAccount />} />
            <Route path={PATHS.USER} element={<UserPage />} />
            <Route path={PATHS.OTHER} element={<OtherPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path={`/login`} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
