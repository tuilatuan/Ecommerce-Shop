import React from "react";
import { otherService } from "../../services/otherPage";
import useQuery from "../../hooks/useQuery";

import { message } from "antd";

const useOtherPage = () => {
  const { data: dataStatus, refetch: statusRefectch } = useQuery(
    otherService.getStatusOrder
  );
  const { data: dataShippings, refetch: shppingRefetch } = useQuery(
    otherService.getShippingType
  );
  const shippingData = dataShippings?.data?.shippingTypes || {};
  const statusData = dataStatus?.data?.statusOrders || {};

  const handleUpdateShipping = async (data) => {
    try {
      const payload = {
        id: data.id,
        price: Number(data.price),
        name: data.name,
      };
      const res = await otherService.updateShippingType(payload);
      if (res.status == 200) {
        message.success("Cập nhật thành công");
        shppingRefetch();
      } else {
        message.success("Cập nhật không thành công");
      }
    } catch (error) {
      console.log("error :>> ", error);
      message.success("Lỗi");
    }
  };

  const otherProps = { statusData, shippingData, handleUpdateShipping };
  return { otherProps };
};

export default useOtherPage;
