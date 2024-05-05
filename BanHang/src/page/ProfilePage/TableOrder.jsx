import React from "react";
import { formatCurrency } from "../../utils/format";
import { SHIPPING_OPTIONS, STATUSORDER } from "../../contants/general";

const TableOrder = ({ ordersByme }) => {
  return (
    <>
      <h3 className="text-center">Order </h3>
      <table className="table table-cart">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total Product</th>
            <th>Total</th>
            <th>Shipping</th>
            <th>Status Order</th>
          </tr>
        </thead>
        <tbody>
          {ordersByme?.length > 0 ? (
            ordersByme.map((order, index) => {
              const {
                id,
                id_shippingType,
                id_statusOrder,
                id_user,
                total,
                totalProduct,
              } = order || {};
              const getShippingLabelById =
                SHIPPING_OPTIONS.find((option) => option.id === id_shippingType)
                  ?.label || "Unknown Option";

              const getStatusOrder =
                STATUSORDER.find((status) => status.value === id_statusOrder)
                  ?.label || "Không rõ";
              return (
                <tr key={index}>
                  <th>{id}</th>
                  <th>{totalProduct} Sản phẩm</th>
                  <th>{formatCurrency(total)}</th>
                  <th>{getShippingLabelById}</th>
                  <th>{getStatusOrder}</th>
                </tr>
              );
            })
          ) : (
            <tr>
              <th>
                <p>Không có đơn hàng nào</p>
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableOrder;
