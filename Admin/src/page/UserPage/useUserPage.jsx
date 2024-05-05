import React from "react";
import useQuery from "../../hooks/useQuery";
import { userService } from "../../services/userService";
import { message } from "antd";
const useUserPage = () => {
  const { data: userDatas, refetch } = useQuery(userService.getAllUser);

  const allUser = userDatas?.data?.users;

  const handleUpdateUser = async (data) => {
    try {
      const { id, name, phoneNumber, address } = data || {};
      const payload = {
        id: id,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      };

      const res = await userService.updateUser(payload);
      if (res.status == 200) {
        message.success("Cập nhật thành công");
        refetch();
      } else {
        message.error("Cập nhật không thành công");
      }
    } catch (error) {
      console.log("error :>> ", error);
      message.warning("Lỗi");
    }
  };

  const handleDeleteUser = async (data) => {
    try {
      const payload = {
        id: data,
      };
      const res = await userService.deleteUser(payload);

      if (res.status == 200) {
        message.success("Xóa thành công");
        refetch();
      } else {
        message.error("Xóa không thành công");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const userProps = {
    allUser,
    handleUpdateUser,
    handleDeleteUser,
  };

  return { userProps };
};

export default useUserPage;
