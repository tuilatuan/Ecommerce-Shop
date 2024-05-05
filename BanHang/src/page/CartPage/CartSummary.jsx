import React from "react";
import Button from "../../component/Button";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";
import { formatCurrency } from "../../utils/format";

const CartSummary = ({ cartInfo }) => {
  let subtotal = 0;
  let total = 0;
  if (cartInfo?.length > 0) {
    cartInfo?.map((product) => {
      subtotal = subtotal + product.subTotal;
      total = total + product.subTotal;
    });
  }

  return (
    <div className="col-lg-3 ">
      <div className="summary">
        <h4>Cart Total</h4>
        <div className="flexsp subtotal">
          <span>Subtotal: </span>
          <p>{formatCurrency(subtotal)}</p>
        </div>

        <div className="flexsp total">
          <span>Total:</span>
          <p>{formatCurrency(total)}</p>
        </div>

        <Link to={PATHS.CHECKOUT} className="btn  btn-summary">
          Checkout
        </Link>
      </div>
      <Link to={PATHS.PRODUCT.INDEX} className="btn-continue">
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
