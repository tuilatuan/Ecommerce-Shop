import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";

const RecomentProduct = () => {
  return (
    <div className="section">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row">
          {/* shop */}
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="/asset/img/shop01.png" alt="img" />
              </div>
              <div className="shop-body">
                <h3>
                  Laptop
                  <br />
                  Collection
                </h3>
                <Link to={PATHS.PRODUCT.INDEX + "?category=1"} className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
          </div>
          {/* /shop */} {/* shop */}
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="/asset/img/shop03.png" alt="img" />
              </div>
              <div className="shop-body">
                <h3>
                  Accessories
                  <br />
                  Collection
                </h3>
                <Link to={PATHS.PRODUCT.INDEX + "?category=6"} className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
          </div>
          {/* /shop */} {/* shop */}
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="/asset/img/iphone-11-64.jpg" alt="img" />
              </div>
              <div className="shop-body">
                <h3>
                  Smartphones
                  <br />
                  Collection
                </h3>
                <Link to={PATHS.PRODUCT.INDEX + "?category=2"} className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
          </div>
          {/* /shop */}
        </div>
        {/* /row */}
      </div>
      {/* /container */}
    </div>
  );
};

export default RecomentProduct;
