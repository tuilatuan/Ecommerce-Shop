import React from "react";
import Input from "../../component/Input";
import useProfilePage from "./useProfilePage";
import FormInfo from "./FormInfo";
import TableOrder from "./TableOrder";

const ProfilePage = () => {
  const { profileProps } = useProfilePage();
  const { ordersByme, profile, handleUpdateProfileInfo } = profileProps || {};
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <TableOrder ordersByme={ordersByme} />
          </div>
          <div className="col-lg-5">
            <FormInfo
              {...profile}
              handleUpdateProfileInfo={handleUpdateProfileInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
