import React, { useEffect, useState } from "react";
import { MODAL_TYPE } from "../../contants/general";
import cn from "../../utils/cn";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal } from "../../store/reducers/authReducer";

const AuthenModal = () => {
  const [modalType, setModalType] = useState(MODAL_TYPE.login);
  const { showedModal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const _onCloseModal = (e) => {
    e?.preventDefault();
    dispatch(handleCloseModal());
  };
  return (
    <div
      id="myModal"
      className="modal"
      style={{ display: showedModal ? "block" : "none", zIndex: 1000 }}
    >
      <div className="modal-content">
        <span className="close" onClick={_onCloseModal}>
          ×
        </span>
        <div className="tab">
          <button
            className={cn("tablinks", {
              active: modalType === MODAL_TYPE.login,
            })}
            onClick={() => setModalType(MODAL_TYPE.login)}
          >
            Login
          </button>
          <button
            className={cn("tablinks", {
              active: modalType === MODAL_TYPE.register,
            })}
            onClick={() => setModalType(MODAL_TYPE.register)}
          >
            Register
          </button>
        </div>
        <LoginForm modalType={modalType} />
        <RegisterForm modalType={modalType} />
      </div>
    </div>
  );
};

export default AuthenModal;
