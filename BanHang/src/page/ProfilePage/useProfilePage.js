import React from "react";
import { orderService } from "../../services/orderService";
import useQuery from "../../hooks/useQuery";
import { useSelector } from "react-redux";
import { authService } from "../../services/authService";
import { message } from "antd";

const useProfilePage = () => {
  const { profile } = useSelector((state) => state.auth);

  const { data, refetch: refetchProfile } = useQuery(orderService.getOrderByMe);

  const ordersByme = data?.orders || {};

  const handleUpdateProfileInfo = async (data) => {
    try {
      const payload = {
        id: data.id,
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address,
      };

      const res = await authService.updateProfile(payload);

      if (res.status == 200) {
        message.success("Cập nhật thông tin thành công");
        refetchProfile();
      } else {
        message.error("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      message.success("Lỗi");
      console.log("error :>> ", error);
    }
  };

  const profileProps = {
    ordersByme,
    profile,
    handleUpdateProfileInfo,
  };
  return { profileProps };
};

export default useProfilePage;
