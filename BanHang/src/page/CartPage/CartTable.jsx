import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import QuantityInput from "../../component/QuantityInput";
import PATHS from "../../contants/paths";
import styled from "styled-components";
import { Modal } from "antd";

const CartTable = ({
  cartInfo,
  quantityRef,
  handleRemoveProduct,
  handleUpdateQuantity,
}) => {
  const { confirm } = Modal;
  const _onRemoveClick = (e, removedIndex) => {
    e?.preventDefault();
    e?.stopPropagation();

    const removeProduct = cartInfo?.[removedIndex] || {};
    const { quantity, subTotal, id, Product } = removeProduct || {};
    const { name } = Product || {};
    confirm({
      title: "Do you want removed this item form cart?",
      content: (
        <>
          <p>{`${name || ""}`}</p>
          <p>{`${quantity || 0} x ${subTotal} `}</p>
        </>
      ),
      onOk() {
        handleRemoveProduct?.(id);
      },
      oncancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="col-lg-9">
      <table className="table table-cart">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartInfo?.length > 0 &&
            cartInfo?.map((product, index) => {
              const { name, images, slug, price } = product.Product || {};
              const img = "/asset/img/" + images;
              const priceFormat = formatCurrency(price);
              const link = PATHS.PRODUCT.INDEX + `/${slug}`;
              return (
                <tr key={product.id || index}>
                  <td className="product-col">
                    <div className="producttable">
                      <figure className="product-media">
                        <Link to={link}>
                          <img src={img} alt={slug} />
                        </Link>
                      </figure>
                      <ProductTitle className="product-title">
                        <Link>{name}</Link>
                      </ProductTitle>
                    </div>
                  </td>
                  <td className="price-col">{priceFormat}</td>
                  <td className="quantity-col">
                    <div className="cart-product-quantity">
                      <QuantityInput
                        ref={(thisRef) => (quantityRef.current[index] = thisRef)}
                        max={100}
                        defaultValue={product.quantity}
                        onChange={(value) => handleUpdateQuantity(value, index)}
                      />
                    </div>
                  </td>
                  <td className="total-col">{formatCurrency(product.subTotal)}</td>
                  <td className="remove-col">
                    <button
                      className="btn-remove"
                      onClick={(e) => _onRemoveClick(e, index)}
                    >
                      x
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
