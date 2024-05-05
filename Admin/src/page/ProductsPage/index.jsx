import React from "react";
import Panigation from "../../component/Panigation";
import useProductPage from "./useProductPage";
import ProductCart from "../../component/ProductCart";
import FilterProduct from "./FilterProduct";
import PATHS from "../../contants/paths";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const { products, pagiProps, filterProps } = useProductPage();
  return (
    <>
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <div className="page-header">
              <h2 className="pageheader-title">Dashboard Product</h2>
              <p className="pageheader-text">
                Nulla euismod urna eros, sit amet scelerisque torton lectus vel
                mauris facilisis faucibus at enim quis massa lobortis rutrum.
              </p>
              <div className="page-breadcrumb row justify-content-between mr-0">
                <nav
                  aria-label="breadcrumb  "
                  className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#" className="breadcrumb-link">
                        Home
                      </a>
                    </li>
                    ss
                    <li className="breadcrumb-item active" aria-current="page">
                      Products
                    </li>
                  </ol>
                </nav>
                <Link
                  to={PATHS.PRODUCT.NEW}
                  className="btn btn-secondary col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 "
                >
                  Thêm
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
            {products?.length > 0 ? (
              <div className="row">
                {products?.map((product, index) => {
                  return <ProductCart key={product?.id || index} {...product} />;
                })}
                <Panigation {...pagiProps} />
              </div>
            ) : (
              <p>There is no product</p>
            )}
          </div>
          <FilterProduct {...filterProps} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
