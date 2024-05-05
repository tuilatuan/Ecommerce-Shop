import React from "react";

const Breadcrumb = ({ className, children }) => {
  return (
    <div id="breadcrumb" className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul className="breadcrumb-tree">{children}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const BreadcrumbItem = ({ children, isActive = false }) => {
  return (
    <li className={`breadcrumb-item ${isActive ? "active" : ""}`}>{children}</li>
  );
};

Breadcrumb.Item = BreadcrumbItem;
export default Breadcrumb;
