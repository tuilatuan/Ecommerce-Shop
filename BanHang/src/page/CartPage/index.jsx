import React from "react";
import Breadcrumb from "../../component/Breadcrumb";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";
import useCartPage from "./useCartPage";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
import CartTble from "./CartTble";

const CartPage = () => {
  const { cartProps, cartTableProps } = useCartPage();

  const { cartInfo } = cartTableProps || {};
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>

      <div className="section">
        <div className="container">
          <div className="row">
            <CartTble {...cartTableProps} />
            <CartSummary cartInfo={cartInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
