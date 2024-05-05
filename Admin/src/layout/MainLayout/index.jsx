import React from "react";
import MainContextProvider from "../../context/MainContext";
import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../../component/Footer";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <div className="dashboard-main-wrapper">
        <Header />
        <Sidebar />
        <div className="dashboard-wrapper">
          <div className="dashboard-ecommerce">
            <div className="container-fluid dashboard-content ">
              <Outlet />
            </div>

            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </MainContextProvider>
  );
};

export default MainLayout;
