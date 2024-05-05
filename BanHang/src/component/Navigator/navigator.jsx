import React, { useEffect } from "react";
import { NavLink } from "react-router-dom/dist";
import PATHS from "../../contants/paths";

const Navigator = () => {
  useEffect(() => {
    // Mobile Nav toggle
    $(".menu-toggle > a").on("click", function (e) {
      e.preventDefault();
      $("#responsive-nav").toggleClass("active");
    });
  }, []);
  return (
    <nav id="navigation">
      {/* container */}
      <div className="container">
        {/* responsive-nav */}
        <div id="responsive-nav">
          {/* NAV */}
          <ul className="main-nav nav navbar-nav">
            <li>
              <NavLink to={PATHS.HOME}>Home</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCT.INDEX}>Products</NavLink>
            </li>
            {/* <li>
              <NavLink to={PATHS.HOME}>Contact</NavLink>
            </li> */}
            <li>
              <NavLink to={PATHS.PROFILE.INDEX}>Profile</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CART}>Cart</NavLink>
            </li>
          </ul>
          {/* /NAV */}
        </div>
        {/* /responsive-nav */}
      </div>
      {/* /container */}
    </nav>
  );
};

export default Navigator;
