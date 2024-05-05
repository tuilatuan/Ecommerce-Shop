import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import PATHS from "../../contants/paths";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "../../store/reducers/cartReducer";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { id, name, slug, images, price, description, category_id, deal } =
    product || {};
  const { profile } = useSelector((state) => state.auth);

  const { account_id, address, email_user, phoneNumber, user_id } = profile || {};

  const img = "/asset/img/" + images;
  const priceFormat = formatCurrency(price);
  const link = PATHS.PRODUCT.INDEX + `/${slug}`;

  const __onAddToCart = () => {
    const payload = {
      id_user: user_id,
      addedId: id,
      addedQuantity: 1,
      subTotal: Number(1 * price),
    };
    dispatch(handleAddCart(payload));
  };
  return (
    <div className="product ">
      <Link to={link} className="product-img">
        <img src={img} alt="img" />
        {deal && (
          <div className="product-label">
            <span className="sale">-30%</span>
            <span className="new">NEW</span>
          </div>
        )}
      </Link>
      <div className="product-body">
        <p className="product-category">{category_id}</p>
        <h3 className="product-name">
          <Link to={link}>{name}</Link>
        </h3>
        <h4 className="product-price">
          {priceFormat}
          {/* <del className="product-old-price">$990.00</del> */}
        </h4>
        <div className="product-rating">
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
        </div>
        <div className="product-btns">
          <button className="add-to-wishlist">
            <i className="fa fa-heart-o" />
            <span className="tooltipp">add to wishlist</span>
          </button>
          <button className="add-to-compare">
            <i className="fa fa-exchange" />
            <span className="tooltipp">add to compare</span>
          </button>
          <button className="quick-view">
            <i className="fa fa-eye" />
            <span className="tooltipp">quick view</span>
          </button>
        </div>
      </div>
      <div className="add-to-cart">
        <button className="add-to-cart-btn" onClick={__onAddToCart}>
          <i className="fa fa-shopping-cart" /> add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
