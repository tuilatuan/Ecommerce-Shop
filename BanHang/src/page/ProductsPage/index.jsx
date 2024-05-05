import React, { useEffect } from "react";
import useProductPage from "./useProductPage";
import ProductCard from "../../component/ProductCard";
import ProductFilter from "./ProductFilter";
import ProductStore from "./ProductStore";
// import Checkbox from "../../component/Checkbox";

const ProductsPage = () => {
  const { productProps, categories, pagiProps, filterProps } = useProductPage();
  const products = productProps?.products || {};

  return (
    <div>
      {/* SECTION */}
      <div className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            {/* ASIDE */}
            <ProductFilter {...filterProps} />
            {/* /ASIDE */}
            {/* STORE */}
            <ProductStore products={products} pagiProps={pagiProps} />
            {/* /STORE */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* /SECTION */}
      {/* NEWSLETTER */}
      <div id="newsletter" className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-md-12">
              <div className="newsletter">
                <p>
                  Sign Up for the <strong>NEWSLETTER</strong>
                </p>
                <form>
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter Your Email"
                  />
                  <button className="newsletter-btn">
                    <i className="fa fa-envelope" /> Subscribe
                  </button>
                </form>
                <ul className="newsletter-follow">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-pinterest" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
      {/* /NEWSLETTER */}
    </div>
  );
};

export default ProductsPage;
