import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useHeader = () => {
  const dispatch = useDispatch();
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);

  //   const handleRemoveProduct = (removedIndex) => {
  //     if (cartLoading || removedIndex < 0) return;
  //     dispatch(handleRemoveFormCart({ removedIndex }));
  //   };
  const cartDropdownProps = {
    cartInfo,
  };
  return { cartDropdownProps };
};

export default useHeader;
