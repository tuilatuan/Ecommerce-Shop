import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteToCart,
  handleGetCart,
  handleUpdateCart,
} from "../../store/reducers/cartReducer";

const useCartPage = () => {
  const dispatch = useDispatch();
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);

  const quantityRef = useRef([]);
  const updateQuantityTimeout = useRef();

  const handleUpdateQuantity = (updateQuantity, updateId) => {
    const { id, id_product, id_user, quantity, subTotal, Product } =
      cartInfo[updateId] || {};
    const { price, name } = Product || {};

    const getPayload = () => {
      let subtotal = 0;
      subtotal = price * updateQuantity;
      return {
        id,
        id_product,
        id_user,
        updateQuantity,
        subTotal: subtotal,
      };
    };
    if (updateQuantityTimeout.current) {
      clearTimeout(updateQuantityTimeout.current);
    }

    updateQuantityTimeout.current = setTimeout(async () => {
      if (!cartLoading && updateQuantity !== "" && quantity !== updateQuantity) {
        try {
          const res = await dispatch(handleUpdateCart(getPayload())).unwrap();
        } catch (error) {
          console.log("error :>> ", error);
          quantityRef.current[updateId]?.reset?.();
        }
      }
    }, 300);
  };
  const handleRemoveProduct = (removedId) => {
    if (cartLoading || removedId < 0) return;
    dispatch(handleDeleteToCart(removedId));
  };
  const cartTableProps = {
    cartInfo,
    quantityRef,
    cartLoading,
    handleRemoveProduct,
    handleUpdateQuantity,
  };
  return { cartTableProps };
};

export default useCartPage;
