import React, { useEffect } from "react";
import ProductCard from "../../component/ProductCard";
import PATHS from "../../contants/paths";
import { Link } from "react-router-dom";

const NewProduct = ({ newProducts }) => {
  return (
    <div className="section">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row">
          {/* section title */}
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">New Products</h3>
              <div className="section-nav">
                <ul className="section-tab-nav tab-nav">
                  <li className="active">
                    <Link to={PATHS.PRODUCT.INDEX}>Tất cả</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* /section title */} {/* Products tab & slick */}
          <div className="col-md-12">
            <div className="row">
              <div className="products-tabs">
                {/* tab */}
                {newProducts?.length > 0 && (
                  <div id="tab1" className="tab-pane active">
                    <div className="products-slick" data-nav="#slick-nav-1">
                      {newProducts?.map((product, index) => {
                        return (
                          <ProductCard key={product.id || index} product={product} />
                        );
                      })}
                    </div>
                    <div id="slick-nav-1" className="products-slick-nav" />
                  </div>
                )}

                {/* /tab */}
              </div>
            </div>
          </div>
          {/* Products tab & slick */}
        </div>
        {/* /row */}
      </div>
      {/* /container */}
    </div>
  );
};

export default NewProduct;
