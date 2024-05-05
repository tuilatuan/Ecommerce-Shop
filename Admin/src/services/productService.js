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
  updateProduct(payload = {}) {
    return axiosInstance.put(`/product`, payload);
  },
  updateCategory(payload = {}) {
    return axiosInstance.put(`/category/${payload.id}`, payload);
  },
  newProduct(payload = {}) {
    return axiosInstance.post(`/product/create`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  newCategory(payload = {}) {
    return axiosInstance.post(`/category`, payload);
  },
  deleteCategory(payload = {}) {
    return axiosInstance.delete(`/category/${payload.id}`, payload);
  },
};
