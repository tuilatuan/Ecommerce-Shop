import React from "react";
import TopHeader from "./TopHeader";
import CartDropDown from "../CartDropDown";
import useHeader from "../../hooks/useHeader";
import SearchInputHeader from "../SearchInputHeader";
import { Link, useLocation, useParams } from "react-router-dom";
import { message } from "antd";
import PATHS from "../../contants/paths";

const Header = () => {
  const { cartDropdownProps } = useHeader();

  const cartInfo = cartDropdownProps?.cartInfo || {};

  const qtyCart = cartInfo?.length || 0;

  const _onAddWhishList = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    message.warning("Chức năng đang phát triền");
  };
  return (
    <header>
      {/* TOP HEADER */}
      <TopHeader />
      {/* /TOP HEADER */}
      {/* MAIN HEADER */}
      <div id="header">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            {/* LOGO */}
            <div className="col-md-3">
              <div className="header-logo">
                <Link to={PATHS.HOME} className="logo">
                  <img src="/asset/img/logo.png" alt="logo" />
                </Link>
              </div>
            </div>
            {/* /LOGO */}
            {/* SEARCH BAR */}
            <SearchInputHeader />
            {/* /SEARCH BAR */}
            {/* ACCOUNT */}
            <div className="col-md-3 clearfix">
              <div className="header-ctn">
                {/* Wishlist */}
                <div>
                  <a href="#" onClick={_onAddWhishList}>
                    <i className="fa fa-heart-o" />
                    <span>Your Wishlist</span>
                    <div className="qty">0</div>
                  </a>
                </div>
                {/* /Wishlist */}
                {/* Cart */}
                <div className="dropdown">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <i className="fa fa-shopping-cart" />
                    <span>Your Cart</span>
                    <div className="qty">{qtyCart}</div>
                  </a>
                  <CartDropDown cartInfos={cartInfo} />
                </div>
                {/* /Cart */}
                {/* Menu Toogle */}
                <div className="menu-toggle">
                  <a href="#">
                    <i className="fa fa-bars" />
                    <span>Menu</span>
                  </a>
                </div>
                {/* /Menu Toogle */}
              </div>
            </div>
            {/* /ACCOUNT */}
          </div>
          {/* row */}
        </div>
        {/* container */}
      </div>
      {/* /MAIN HEADER */}{" "}
    </header>
  );
};

export default Header;
