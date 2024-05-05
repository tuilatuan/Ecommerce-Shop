import React, { useState } from "react";
import useAccountPage from "./useAccountPage";
import AccountTable from "./AccountTable";
import { Link } from "react-router-dom";
import PATHS from "../../contants/paths";
import Input from "../../component/Input";
import EditForm from "./EditForm";

const AccountPage = () => {
  const { accountProps, handleUpdateAccount } = useAccountPage();
  const { allAccount } = { ...accountProps };
  const [account, setAccount] = useState([]);
  const changeAccountUpdate = (index) => {
    setAccount(allAccount[index]);
  };

  return (
    <>
      <Link to={PATHS.ACCOUNT.NEW} className="btn btn-space btn-secondary">
        New Account
      </Link>
      <div className="row">
        <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12">
          <AccountTable
            allAccount={allAccount}
            changeAccountUpdate={changeAccountUpdate}
          />
        </div>
        <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
          <EditForm {...account} handleUpdateAccount={handleUpdateAccount} />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
