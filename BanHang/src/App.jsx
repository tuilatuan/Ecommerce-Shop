import { BrowserRouter, Route, Routes } from "react-router-dom/dist";
import MainLayout from "./layout/MainLayout";
import HomePage from "./page/HomePage";
import PrivateRoute from "./component/PrivateRoute";
import PATHS from "./contants/paths";
import CartPage from "./page/CartPage";
import ProductsPage from "./page/ProductsPage";
import ErrorPage from "./page/404Page";
import ProductDetailPage from "./page/ProductDetailPage";
import { useEffect } from "react";
import tokenMethod from "./utils/token";
import { useDispatch } from "react-redux";
import { handleGetProfile } from "./store/reducers/authReducer";
import CheckoutPage from "./page/CheckoutPage";
import { handleGetCart } from "./store/reducers/cartReducer";
import ProfilePage from "./page/ProfilePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
      dispatch(handleGetCart());
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.PRODUCT.INDEX} element={<ProductsPage />} />
          <Route path={PATHS.PRODUCT.DETAIL} element={<ProductDetailPage />} />
          <Route element={<PrivateRoute redirecPath={PATHS.HOME} />}>
            <Route path={PATHS.CART} element={<CartPage />} />
            <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
            <Route path={PATHS.PROFILE.INDEX} element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
