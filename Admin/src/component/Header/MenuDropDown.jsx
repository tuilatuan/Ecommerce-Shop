import React from "react";

const MenuDropDown = ({
  account_id,
  address,
  email_user,
  name,
  phoneNumber,
  user_id,
  _onLogout,
}) => {
  return (
    <div
      className="dropdown-menu dropdown-menu-right nav-user-dropdown"
      aria-labelledby="navbarDropdownMenuLink2"
    >
      <div className="nav-user-info">
        <h5 className="mb-0 text-white nav-user-name">{name || email_user} </h5>
        <span className="status" />
        <span className="ml-2">Available</span>
      </div>
      <a className="dropdown-item" href="#">
        <i className="fas fa-user mr-2" />
        Account
      </a>
      <a className="dropdown-item" onClick={() => _onLogout()}>
        <i className="fas fa-power-off mr-2" />
        Logout
      </a>
    </div>
  );
};

export default MenuDropDown;
