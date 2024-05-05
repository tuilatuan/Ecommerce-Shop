import React from "react";
import ProductCard from "../../component/ProductCard";
import Pagination from "../../component/Pagination/index.jsx";

const ProductStore = ({ products, pagiProps }) => {
  const { limit, total } = pagiProps || {};

  if (products?.length < 1) {
    return (
      <div className="mb-3">
        <div className="row justify-content-center text-center ">
          <h4>There is no product</h4>
        </div>
      </div>
    );
  }
  return (
    <div id="store" className="col-md-9">
      <div className="store-filter clearfix">
        <span className="store-qty">
          Showing <span>{limit > total ? total : limit}</span> of{" "}
          <span>{total}</span> products
        </span>
      </div>
      {/* store products */}
      <div className="row">
        {products?.map((product, index) => {
          return (
            <div
              className="col-md-4 col-xs-6"
              style={{ maxHeight: "482px" }}
              key={product.id || index}
            >
              <ProductCard product={product} key={product.id || index} />
            </div>
          );
        })}

        {/* /product */}
      </div>
      {/* /store products */}
      {/* store bottom filter */}
      <Pagination {...pagiProps} />
      {/* /store bottom filter */}
    </div>
  );
};

export default ProductStore;
