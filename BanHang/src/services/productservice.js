import axiosInstance from "../utils/axiosInstance";

export const productService = {
  getProducts(query = "") {
    return axiosInstance.get(`/product${query}`);
  },
  getProductDetail(slug = "") {
    return axiosInstance.get(`/product/${slug}`);
  },
  getAllCategory() {
    return axiosInstance.get(`/category`);
  },
  getAllCategorybySlug(slug = "") {
    return axiosInstance.get(`/category/get-slug/${slug}`);
  },
};
