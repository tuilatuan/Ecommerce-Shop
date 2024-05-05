import React, { useState } from "react";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";
import useOrderPage from "./useOrderPage";
import { formatCurrency } from "../../utils/format";
import { SHIPPING_OPTIONS, STATUSORDER } from "../../contants/general";
import Input from "../../component/Input";
import { Select, message } from "antd";
import cn from "../../utils/cn";

let PRIMARY = "badge-primary",
  WARNING = "badge-warning",
  SUCCESS = "badge-success",
  ERROR = "badge-danger";

const OrderPage = () => {
  const { orderProps, onHandllUpdate } = useOrderPage();

  const [editIndex, setEditIndex] = useState();
  const [idstatus, setIdStatus] = useState();

  const orders = orderProps?.orders || {};

  const _onChageStatus = (data) => {
    console.log("dataChagne :>> ", data);
    setIdStatus(data);
  };

  const _onUpdateStatus = (data) => {
    const payload = { id: data, id_statusOrder: idstatus };
    onHandllUpdate(payload);
    setEditIndex(null);
    setIdStatus();
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
          <div className="page-header">
            <h2 className="pageheader-title">Dashboard Order</h2>
            <p className="pageheader-text">
              Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris
              facilisis faucibus at enim quis massa lobortis rutrum.
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
                  <li className="breadcrumb-item active" aria-current="page">
                    Order
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* recent orders  */}
        {/* ============================================================== */}
        <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
          <div className="card">
            <h5 className="card-header">Recent Orders</h5>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table">
                  <thead className="bg-light">
                    <tr className="border-0">
                      <th className="border-0">ID</th>
                      <th className="border-0">ID User</th>
                      <th className="border-0">Shipping Type</th>
                      <th className="border-0">Total Product</th>
                      <th className="border-0">Total</th>
                      <th className="border-0">Address</th>
                      <th className="border-0">Status Order</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.length > 0 &&
                      orders?.map((order, index) => {
                        const {
                          id,
                          id_shippingType,
                          id_statusOrder,
                          id_user,
                          total,
                          totalProduct,
                          address,
                        } = order || {};
                        const shippingLabel =
                          SHIPPING_OPTIONS.find(
                            (option) => option.value === id_shippingType
                          )?.label || "Unknown";

                        const statusLabel =
                          STATUSORDER.find(
                            (option) => option.value === id_statusOrder
                          )?.label || "Unknown";
                        return (
                          <tr key={index}>
                            <td>{id}</td>
                            <td>{id_user}</td>
                            <td>{shippingLabel}</td>
                            <td>{totalProduct}</td>
                            <td>{formatCurrency(total)}</td>
                            <td>{address}</td>
                            <td>
                              {editIndex == index ? (
                                <Input
                                  name="orderstatus"
                                  renderInput={() => {
                                    return (
                                      <Select
                                        options={STATUSORDER}
                                        value={idstatus}
                                        defaultValue={id_statusOrder}
                                        onChange={_onChageStatus}
                                      />
                                    );
                                  }}
                                />
                              ) : (
                                <span
                                  className={cn("badge ", {
                                    "badge-primary": id_statusOrder <= 2,
                                    " badge-warning":
                                      id_statusOrder <= 4 && id_statusOrder > 2,
                                    "badge-success": id_statusOrder == 5,
                                    "badge-danger": id_statusOrder == 6,
                                  })}
                                >
                                  {statusLabel}
                                </span>
                              )}
                            </td>
                            <td>
                              {editIndex == index ? (
                                <button
                                  type="button"
                                  className="btn btn-warning btn-sm mr-2"
                                  onClick={() => _onUpdateStatus(id)}
                                >
                                  Update Status
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-warning btn-sm mr-2"
                                  onClick={() => setEditIndex(index)}
                                >
                                  Edit Status
                                </button>
                              )}
                              <Link
                                to={`/orderDetail/${id}`}
                                className="btn btn-info btn-sm"
                              >
                                Info
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* ============================================================== */}
        {/* end recent orders  */}
        {/* ============================================================== */}
      </div>
    </>
  );
};

export default OrderPage;
