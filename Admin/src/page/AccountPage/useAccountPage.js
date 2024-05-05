import React from "react";
import { accountService } from "../../services/accountService";
import useQuery from "../../hooks/useQuery";
import { authService } from "../../services/authServices";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import PATHS from "../../contants/paths";

const useAccountPage = () => {
  const { data: dataAccount, refetch } = useQuery(accountService.getAllAccount);
  const navigate = useNavigate();

  const allAccount = dataAccount?.data.accounts || {};

  const handleCreateAccount = async (data) => {
    try {
      const payload = {
        address: data.address,
        email: data.email,
        name: data.name,
        password: data.password,
        phoneNumber: data.phoneNumber,
        role: Number(data.role),
      };
      console.log("payload :>> ", payload);
      const res = await authService.register(payload);
      if (res?.status == 200) {
        message.success("Tạo tài khoản thành công!!");
        navigate(PATHS.ACCOUNT.INDEX);
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      console.log("error :>> ", error);
      if (error?.response.status == 400) {
        message.error("Email đã được đăng ký");
      }
    }
  };

  const handleUpdateAccount = async (data) => {
    try {
      const payload = {
        id: data.id,
        user_id: data.user_id,
        password: data.password,
        role: data.role,
        email: data.email,
      };

      const res = await accountService.updateAcccountById(payload);
      if (res.status == 200) {
        message.success("Cập nhật thành công");
        refetch();
      } else {
        message.warning("Cập nhật không thành công");
      }
    } catch (error) {
      message.error("Cập nhật lỗi");

      console.log("error :>> ", error);
    }
  };

  const accountProps = {
    allAccount,
  };
  return { accountProps, handleCreateAccount, handleUpdateAccount };
};

export default useAccountPage;
