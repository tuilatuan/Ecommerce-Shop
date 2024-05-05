import React, { useState } from "react";
import StatusOrder from "./StatusOrder";
import ShippingType from "./ShippingType";
import useOtherPage from "./useOtherPage";
import EditForm from "./EditForm";

const OtherPage = () => {
  const { otherProps } = useOtherPage();
  const { statusData, shippingData, handleUpdateShipping } = { ...otherProps };

  const [updateData, setUpdateData] = useState();
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 col-6">
        <StatusOrder statusData={statusData} />
      </div>
      <div className="col-xl-5 col-lg-5 col-md-8 col-sm-6 col-6">
        <ShippingType shippingData={shippingData} setUpdateData={setUpdateData} />
      </div>
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6">
        <EditForm
          {...shippingData[updateData]}
          setUpdateData={setUpdateData}
          handleUpdateShipping={handleUpdateShipping}
        />
      </div>
    </div>
  );
};

export default OtherPage;
