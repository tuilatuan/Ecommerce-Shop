import React from "react";
import useQuery from "../../hooks/useQuery";
import { orderService } from "../../services/orderService";

const useHomePage = () => {
  const { data, refetch } = useQuery(orderService.getAll);
  const orders = data?.data?.orders;
  var totalOrderQty = orders?.reduce((acc, obj) => acc + obj.totalProduct, 0);
  var totalOrderPrice = orders?.reduce((acc, obj) => acc + obj.total, 0);
  const homeProps = {
    orders,
    totalOrderQty,
    totalOrderPrice,
  };

  return { homeProps };
};

export default useHomePage;
