import axiosInstance from "../utils/axiosInstance";
import tokenMethod from "../utils/token";

export const cartService = {
  getCart() {
    return axiosInstance.get(`/cart/me`);
  },
  addTocart(payload = {}) {
    return axiosInstance.post(`/cart/`, payload);
  },
  deleteToCart(id = {}) {
    return axiosInstance.delete(`/cart/${id}`);
  },
  updateToCart(payload = {}) {
    return axiosInstance.put(`/cart/`, payload);
  },
};
