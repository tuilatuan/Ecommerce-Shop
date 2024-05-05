import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productservice";
import useQuery from "../../hooks/useQuery";
import tokenMethod from "../../utils/token";
import { message } from "antd";
import { handleShowModal } from "../../store/reducers/authReducer";
import { handleAddCart } from "../../store/reducers/cartReducer";

const useProductDetail = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { productID } = useParams();
  const quantityRef = useRef();

  const { data: productData } = useQuery(
    () => productService.getProductDetail(productID),
    [productID]
  );

  //Info User
  const { account_id, address, email_user, phoneNumber, user_id } = profile || {};

  const { id, name, description, shippingReturn, price, discount } =
    productData?.product || {};
  let id_product = productData?.product?.id;
  const productDetail = productData?.product;

  const handleAddToCart = () => {
    if (tokenMethod?.get()) {
      const { value: quantity, reset: quantityReset } = quantityRef.current || {};

      if (isNaN(quantity) && quantity < 1) {
        message.error("Quantity must be greater than 1");
        return;
      }
      const subTotal = price * quantity;

      const addedPayload = {
        id_user: user_id,
        addedId: id_product,
        addedQuantity: Number(quantity),
        subTotal: Number(subTotal),
      };
      try {
        const res = dispatch(handleAddCart(addedPayload)).unwrap();
        if (res) {
          quantityReset?.();
        }
      } catch (error) {}
    } else {
      dispatch(handleShowModal());
    }
  };

  const productsDetailProps = { productDetail, quantityRef, handleAddToCart };
  return { productsDetailProps };
};

export default useProductDetail;
