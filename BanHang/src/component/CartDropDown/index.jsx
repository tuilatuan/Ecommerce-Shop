import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";
import { formatCurrency } from "../../utils/format";
import { useDispatch } from "react-redux";
import { handleDeleteToCart } from "../../store/reducers/cartReducer";

const CartDropDown = ({ cartInfos }) => {
  let total = 0;
  let countProdcut = 0;
  {
    cartInfos?.length > 0 &&
      cartInfos?.map((product, index) => {
        const { id, id_product, id_user_quantity, subTotal } = product || {};
        total = total + subTotal;
        countProdcut++;
      });
  }
  const dispatch = useDispatch();
  const _deleteCart = (data) => {
    dispatch(handleDeleteToCart(data));
  };
  return (
    <div className="cart-dropdown">
      {cartInfos?.length > 0 && (
        <div className="cart-list">
          {cartInfos?.map((product, index) => {
            const {
              id_product: id,
              description,
              name,
              price,
              slug,
              images,
            } = product?.Product || {};
            const id_cart = product?.id;

            let quantity = product?.quantity || "";
            let imagePath = `/asset/img/${images}`;
            let priceFormat = formatCurrency(price);

            return (
              <div className="product-widget" key={product.id || index}>
                <div className="product-img">
                  <img src={imagePath} alt={slug} />
                </div>
                <div className="product-body">
                  <h3 className="product-name">
                    <Link to={PATHS.PRODUCT.INDEX + `/${slug}`}>{name}</Link>
                  </h3>
                  <h4 className="product-price">
                    <span className="qty">
                      {quantity}x {priceFormat}
                    </span>
                  </h4>
                </div>
                <button className="delete" onClick={() => _deleteCart(id_cart)}>
                  <i className="fa fa-close" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      <div className="cart-summary">
        <small>{countProdcut} Item(s) selected</small>
        <h5>SUBTOTAL: {formatCurrency(total)}</h5>
      </div>
      <div className="cart-btns">
        <Link to={PATHS.CART}>View Cart</Link>
        <Link to={PATHS.CHECKOUT}>
          Checkout <i className="fa fa-arrow-circle-right" />
        </Link>
      </div>
    </div>
  );
};

export default CartDropDown;
