import React, { useEffect } from "react";
import ProductCard from "../../component/ProductCard";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";

const TopSelling = ({ hotProduct }) => {
  return (
    <div className="section">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row">
          {/* section title */}
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">Top selling</h3>
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
                {hotProduct?.length > 0 && (
                  <div id="tab2" className="tab-pane fade in active">
                    <div className="products-slick" data-nav="#slick-nav-2">
                      {hotProduct?.map((product, index) => {
                        return (
                          <ProductCard key={product.id || index} product={product} />
                        );
                      })}
                    </div>
                    <div id="slick-nav-2" className="products-slick-nav" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* /row */}
      </div>
      {/* /container */}
    </div>
  );
};

export default TopSelling;
