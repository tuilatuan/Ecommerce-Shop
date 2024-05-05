import React from "react";
import { formatCurrency } from "../../utils/format";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";

const ProductCart = ({ id, name, images, price, slug }) => {
  let productPath = PATHS.PRODUCT.INDEX + `/${slug}`;
  let imagePath = "";
  if (images.startsWith("https://")) {
    imagePath = images;
  } else {
    imagePath = `/assets/img/${images}`;
  }

  return (
    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
      <div className="product-thumbnail">
        <div className="product-img-head">
          <div className="product-img">
            <Link to={productPath}>
              <img src={imagePath} alt="img-product" className="img-fluid" />
            </Link>
          </div>
          {/* <div className="ribbons" />
          <div className="ribbons-text">New</div>
          <div className="">
            <a href="#" className="product-wishlist-btn">
              <i className="fas fa-heart" />
            </a>
          </div> */}
        </div>
        <div className="product-content">
          <div className="product-content-head">
            <Link to={productPath}>
              <h3 className="product-title">{name}</h3>
            </Link>
            <div className="product-rating ">
              <i className="fa fa-fw fa-star" />
              <i className="fa fa-fw fa-star" />
              <i className="fa fa-fw fa-star" />
              <i className="fa fa-fw fa-star" />
              <i className="fa fa-fw fa-star" />
            </div>
            <div className="product-price">{formatCurrency(price)}</div>
          </div>
          <div className="product-btn">
            <Link to={productPath} className="btn btn-info">
              Update Product
            </Link>
            <a href="#" className="btn btn-outline-danger">
              Delete
            </a>
            {/* <a href="#" className="btn btn-outline-light">
              <i className="fas fa-exchange-alt" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
