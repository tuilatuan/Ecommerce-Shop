import React from "react";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../../contants/paths";

const Sidebar = () => {
  return (
    <div className="nav-left-sidebar sidebar-dark">
      <div className="menu-list">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="d-xl-none d-lg-none" href="#">
            Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-column">
              <li className="nav-divider">Menu</li>
              <li className="nav-item ">
                <NavLink
                  className="nav-link "
                  to={PATHS.HOME}
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu-1"
                  aria-controls="submenu-1"
                >
                  <i className="fa fa-fw fa-user-circle" />
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu-2"
                  aria-controls="submenu-2"
                >
                  <i className="fa fa-fw fa-rocket" />
                  Product
                </a>
                <div id="submenu-2" className="collapse submenu" style={{}}>
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link className="nav-link" to={PATHS.PRODUCT.INDEX}>
                        List <span className="badge badge-secondary">New</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={PATHS.PRODUCT.CATE}>
                        Category
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={PATHS.ORDER.INDEX}
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu-3"
                  aria-controls="submenu-3"
                >
                  <i className="fas fa-fw fa-chart-pie" />
                  Order
                </NavLink>
              </li>
              <li className="nav-item ">
                <Link
                  to={PATHS.ACCOUNT.INDEX}
                  className="nav-link"
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu-4"
                  aria-controls="submenu-4"
                >
                  <i className="fab fa-fw fa-wpforms" />
                  Account
                </Link>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={PATHS.USER}
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu-5"
                  aria-controls="submenu-5"
                >
                  <i className="fas fa-fw fa-table" />
                  User
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={PATHS.OTHER}
                  data-toggle="collapse"
                  aria-expanded="false"
                  data-target="#submenu-5"
                  aria-controls="submenu-5"
                >
                  <i className="fas fa-fw fa-table" />
                  Other
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
