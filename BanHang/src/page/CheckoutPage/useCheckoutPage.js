import React from "react";
import { orderService } from "../../services/orderService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import PATHS from "../../contants/paths";
import { useDispatch } from "react-redux";
import { handleAddCart, handleGetCart } from "../../store/reducers/cartReducer";

const useCheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckout = async (data) => {
    if (data) {
      const payload = {
        address: data.address,
        id_shippingType: data.id_shippingtype,
        id_statusOrder: data.id_statusOrder,
      };
      try {
        console.log("payload :>> ", payload);
        const res = orderService.checkout(payload);
        if (res) {
          message.success("Mua hàng thành công");
          dispatch(handleGetCart());
          navigate(PATHS.HOME);
        } else {
          message.error("Mua hàng không thành công");
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };

  const checkoutProps = {
    handleCheckout,
  };

  return { checkoutProps, handleCheckout };
};

export default useCheckoutPage;
