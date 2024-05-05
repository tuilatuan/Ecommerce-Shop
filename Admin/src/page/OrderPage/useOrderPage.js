import React, { useCallback } from "react";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { orderService } from "../../services/orderService";
import { message } from "antd";
const useOrderPage = () => {
  const { data, refetch } = useQuery(orderService.getAll);
  const orders = data?.data?.orders;
  const orderProps = {
    orders,
  };

  const onHandllUpdate = async (data) => {
    try {
      const res = await orderService.updateStatus(data);
      if (res.status == 200) {
        message.success("Cập nhật thành công");
        refetch();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return { orderProps, onHandllUpdate };
};

export default useOrderPage;
