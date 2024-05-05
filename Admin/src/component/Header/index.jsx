import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../store/reducers/authReducer";
import { Link, useNavigate } from "react-router-dom";
import MenuDropDown from "./MenuDropDown";
import PATHS from "../../contants/paths";

const Header = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.auth);

  const { account_id, address, email_user, name, phoneNumber, user_id } =
    profile || {};
  const navigate = useNavigate();
  const _onLogout = (e) => {
    e?.preventDefault();
    e?.stopPropagition();
    dispatch(handleLogout());
    navigate("/login");
  };

  return (
    <div className="dashboard-header">
      <nav className="navbar navbar-expand-lg bg-white fixed-top">
        <Link to={PATHS.HOME} className="navbar-brand">
          {/* <img src="./public/assets/img/logo.png" /> */}
          Electron
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto navbar-right-top">
            <li className="nav-item dropdown nav-user">
              <a
                className="nav-link nav-user-img"
                href="#"
                id="navbarDropdownMenuLink2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="assets/images/avatar-1.jpg"
                  alt="img"
                  className="user-avatar-md rounded-circle"
                />
              </a>
              <MenuDropDown {...profile} _onLogout={_onLogout} />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
