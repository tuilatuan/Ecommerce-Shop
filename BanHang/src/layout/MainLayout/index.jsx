import React, { useEffect } from "react";
import MainContextProvider from "../../context/MainContext";
import { Outlet } from "react-router-dom";
import Header from "../../component/Header";
import Navigator from "../../component/Navigator/navigator";
import Footer from "../../component/Footer";
import AuthenModal from "../../component/ModalAuthen";

const MainLayout = ({ children }) => {
  return (
    <MainContextProvider>
      <Header />
      <Navigator />

      <Outlet />

      <Footer />
      <AuthenModal />
    </MainContextProvider>
  );
};

export default MainLayout;
