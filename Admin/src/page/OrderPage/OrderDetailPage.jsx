import { useParams, useNavigate, Link } from "react-router-dom";
import React from "react";
import useQuery from "../../hooks/useQuery";
import { orderService } from "../../services/orderService";
import PATHS from "../../contants/paths";
import { formatCurrency } from "../../utils/format";

const OrderDetailPage = () => {
  const { orderID } = useParams();

  const { data: ordersData } = useQuery(
    () => orderService.getOrderDetailByID(orderID),
    [orderID]
  );

  const ordersDetail = ordersData?.orderDetails || {};
  console.log("ordersDetail :>> ", ordersDetail);
  return (
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
                  Order Detail
                </li>
              </ol>
            </nav>
            <Link to={PATHS.ORDER.INDEX} className="btn btn-info">
              Quay lại
            </Link>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <div className="card">
          <h5 className="card-header">Order Detail Table</h5>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">ID_Order</th>
                  <th scope="col">ID_Product</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {ordersDetail?.length > 0 &&
                  ordersDetail.map((order, index) => {
                    const { id, id_product, id_order, subTotal, quantity } =
                      order || {};
                    return (
                      <tr key={id || index}>
                        <th scope="row">{id}</th>
                        <td>{id_order}</td>
                        <td>{id_product}</td>
                        <td>{quantity}</td>
                        <td>{formatCurrency(subTotal)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
