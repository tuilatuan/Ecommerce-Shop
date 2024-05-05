import React, { useEffect } from "react";
import Chart from "./Chart";
import useHomePage from "./useHomePage";
import { formatCurrency } from "../../utils/format";

const HomePage = () => {
  const { homeProps } = useHomePage();
  const { orders, totalOrderQty, totalOrderPrice } = homeProps || {};
  useEffect(() => {
    // $("#sparkline-revenue").sparkline([5, 5, 7, 7, 9, 5, 3, 5, 2, 4, 6, 7], {
    //   type: "line",
    //   width: "99.5%",
    //   height: "100",
    //   lineColor: "#5969ff",
    //   fillColor: "#dbdeff",
    //   lineWidth: 2,
    //   spotColor: undefined,
    //   minSpotColor: undefined,
    //   maxSpotColor: undefined,
    //   highlightSpotColor: undefined,
    //   highlightLineColor: undefined,
    //   resize: true,
    // });
    // $("#sparkline-revenue2").sparkline([3, 7, 6, 4, 5, 4, 3, 5, 5, 2, 3, 1], {
    //   type: "line",
    //   width: "99.5%",
    //   height: "100",
    //   lineColor: "#ff407b",
    //   fillColor: "#ffdbe6",
    //   lineWidth: 2,
    //   spotColor: undefined,
    //   minSpotColor: undefined,
    //   maxSpotColor: undefined,
    //   highlightSpotColor: undefined,
    //   highlightLineColor: undefined,
    //   resize: true,
    // });
    // $("#sparkline-revenue3").sparkline([5, 3, 4, 6, 5, 7, 9, 4, 3, 5, 6, 1], {
    //   type: "line",
    //   width: "99.5%",
    //   height: "100",
    //   lineColor: "#25d5f2",
    //   fillColor: "#dffaff",
    //   lineWidth: 2,
    //   spotColor: undefined,
    //   minSpotColor: undefined,
    //   maxSpotColor: undefined,
    //   highlightSpotColor: undefined,
    //   highlightLineColor: undefined,
    //   resize: true,
    // });
    // $("#sparkline-revenue4").sparkline([6, 5, 3, 4, 2, 5, 3, 8, 6, 4, 5, 1], {
    //   type: "line",
    //   width: "99.5%",
    //   height: "100",
    //   lineColor: "#fec957",
    //   fillColor: "#fff2d5",
    //   lineWidth: 2,
    //   spotColor: undefined,
    //   minSpotColor: undefined,
    //   maxSpotColor: undefined,
    //   highlightSpotColor: undefined,
    //   highlightLineColor: undefined,
    //   resize: true,
    // });
    // ==============================================================
  }, []);

  return (
    <>
      {/* ============================================================== */}
      {/* pageheader  */}
      {/* ============================================================== */}
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="page-header">
            <h2 className="pageheader-title">Electron Dashboard </h2>
            <p className="pageheader-text">
              Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris
              facilisis faucibus at enim quis massa lobortis rutrum.
            </p>
            <div className="page-breadcrumb">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active">
                    <a href="#" className="breadcrumb-link">
                      Electron Dashboard
                    </a>
                  </li>
                  {/* <li className="breadcrumb-item active" aria-current="page">
                    E-Commerce Dashboard Template
                  </li> */}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* ============================================================== */}
      {/* end pageheader  */}
      {/* ============================================================== */}
      <div className="ecommerce-widget">
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="text-muted">Total Revenue</h5>
                <div className="metric-value d-inline-block">
                  <h1 className="mb-1">{formatCurrency(totalOrderPrice)}</h1>
                </div>
                {/* <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                  <span>
                    <i className="fa fa-fw fa-arrow-up" />
                  </span>
                  <span>5.86%</span>
                </div> */}
              </div>
              <div id="sparkline-revenue" />
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="text-muted">Products Sales</h5>
                <div className="metric-value d-inline-block">
                  <h1 className="mb-1">{totalOrderQty}</h1>
                </div>
                {/* <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                  <span>
                    <i className="fa fa-fw fa-arrow-up" />
                  </span>
                  <span>5.86%</span>
                </div> */}
              </div>
              <div id="sparkline-revenue2" />
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="text-muted">Refunds</h5>
                <div className="metric-value d-inline-block">
                  <h1 className="mb-1">0.00</h1>
                </div>
                <div className="metric-label d-inline-block float-right text-primary font-weight-bold">
                  <span>N/A</span>
                </div>
              </div>
              <div id="sparkline-revenue3" />
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="text-muted">Avg. Revenue Per User</h5>
                <div className="metric-value d-inline-block">
                  <h1 className="mb-1">$0000</h1>
                </div>
                <div className="metric-label d-inline-block float-right text-secondary font-weight-bold">
                  <span>-2.00%</span>
                </div>
              </div>
              <div id="sparkline-revenue4" />
            </div>
          </div>
        </div>
        <div className="row">
          <Chart />
        </div>
      </div>
    </>
  );
};

export default HomePage;
