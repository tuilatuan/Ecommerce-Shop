import React from "react";
import { handleLogout, handleShowModal } from "../../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import tokenMethod from "../../utils/token";
import Button from "../Button";

const TopHeader = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { name, email } = profile || "";

  const _onShowModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal());
  };
  const _onLogout = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleLogout());
  };
  return (
    <div id="top-header">
      <div className="container">
        <ul className="header-links pull-left">
          <li>
            <a href="#">
              <i className="fa fa-phone" /> +84858310009
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-envelope-o" /> pham.kietred@email.com
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-map-marker" /> 23 Lâm Văn Bền, phường Tân Kiểng,
              Quận 7
            </a>
          </li>
        </ul>
        <ul className="header-links pull-right">
          <li>
            <a href="#">
              <i className="fa fa-dollar" /> VND
            </a>
          </li>
          {!!!tokenMethod.get() ? (
            <>
              <li>
                <a id="openModal" onClick={_onShowModal}>
                  <i className="fa fa-user-o" /> Login | Registers
                </a>
              </li>
            </>
          ) : (
            <li className="boxuser">
              <a id="openModal">
                <i className="fa fa-user-o" />
                {name || email}
              </a>
              <Button className="btnlogout" onClick={_onLogout}>
                Log Out
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TopHeader;
