import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";

const ErrorPage = () => {
  return (
    <div className="dashboard-main-wrapper p-0">
      {/* ============================================================== */}
      {/* navbar */}
      {/* ============================================================== */}
      <nav className="navbar navbar-expand dashboard-top-header bg-white">
        <div className="container-fluid">
          {/* ============================================================== */}
          {/* brand logo */}
          {/* ============================================================== */}
          <div className="dashboard-nav-brand">
            <Link className="dashboard-logo" to={PATHS.HOME}>
              Dashboard
            </Link>
          </div>
          {/* ============================================================== */}
          {/* end brand logo */}
          {/* ============================================================== */}
        </div>
      </nav>
      {/* ============================================================== */}
      {/* end navbar */}
      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* wrapper  */}
      {/* ============================================================== */}
      <div className="bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="error-section">
                <img
                  src="./public/assets/images/error-img.png"
                  alt="img-error"
                  className="img-fluid"
                />
                <div className="error-section-content">
                  <h1 className="display-3">Page Not Found</h1>
                  <p>
                    The generated Lorem Ipsum is therefore always free from
                    repetition, injected humour, or non-characteristic words etc.
                  </p>
                  <Link to={PATHS.HOME} className="btn btn-secondary btn-lg">
                    Back to homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ============================================================== */}
        {/* end wrapper */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* end footer */}
        {/* ============================================================== */}
      </div>
    </div>
  );
};

export default ErrorPage;
