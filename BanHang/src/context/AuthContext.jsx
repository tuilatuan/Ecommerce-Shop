import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   if (tokenMethod.get()) {
  //     dispatch(handleGetProfile());
  //   }
  // }, []);
  return (
    <AuthContext.Provider
      value={
        {
          // showModal,
          // handleUpdateProfile,
          // handleLogout,
          // profile,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
