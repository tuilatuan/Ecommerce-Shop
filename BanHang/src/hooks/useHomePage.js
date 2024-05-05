import React from "react";
import useQuery from "./useQuery";
import { productService } from "../services/productservice";
import { useSelector } from "react-redux";

const useHomePage = () => {
  const { data: products } = useQuery(productService.getProducts);

  const productAll = products?.data?.products || [];
  const newProducts = productAll.slice(0, 9);
  const hotProduct = productAll.slice(9, 19);
  return { newProducts, hotProduct };
};

export default useHomePage;
