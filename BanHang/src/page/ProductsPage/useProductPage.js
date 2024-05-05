import queryString from "query-string";
import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { productService } from "../../services/productservice";
import useQuery from "../../hooks/useQuery";
import { PRICE_FIlTER } from "../../contants/general";
const PRODUCT_LIMITS = 9;
const useProductPage = () => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  const [_, setSearchParams] = useSearchParams();

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );
  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || [];
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getAllCategory);

  const categories = categoriesData?.data?.categories || [];
  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  const onPaniChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  const pagiProps = {
    page: Number(productsPagi.page || queryObject.page || 1),
    limit: Number(productsPagi.limit || 0),
    total: Number(productsPagi.total || 0),
    onPaniChange,
  };
  // Filter Props
  const onCateFilterChange = (cateId, isChecked) => {
    let newCategoryFilter = Array.isArray(queryObject.category)
      ? [...queryObject.category, cateId]
      : [queryObject.category, cateId];
    if (!isChecked) {
      newCategoryFilter = newCategoryFilter.filter(
        (category) => category !== cateId
      );
    }
    if (cateId === "") {
      newCategoryFilter = [];
    }
    updateQueryString({ ...queryObject, category: newCategoryFilter, page: 1 });
  };
  const handlePriceFilterChange = (values) => {
    if (values?.length === 2) {
      updateQueryString({
        ...queryObject,
        minPrice: values[0],
        maxPrice: values[1],
        page: 1,
      });
    }
  };
  const searchString = (searchString) => {
    updateQueryString({ ...queryObject, search: searchString });
  };
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };
  const filterProps = {
    categories: categories || [],
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
    currentPriceRange: [
      queryObject.minPrice || PRICE_FIlTER.minPrice,
      queryObject.maxPrice || PRICE_FIlTER.maxPrice,
    ],
    onCateFilterChange,
    handlePriceFilterChange,
    searchString,
  };
  const productProps = { products };
  return { productProps, pagiProps, filterProps };
};

export default useProductPage;
