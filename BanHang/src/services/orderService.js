import axiosInstance from "../utils/axiosInstance";

export const orderService = {
  checkout(payload = {}) {
    return axiosInstance.post(`/order/checkout`, payload);
  },
  getShipping() {
    return axiosInstance.get(`/shippingType/`);
  },
  getOrderByMe() {
    return axiosInstance.get(`/order/userID`);
  },
};
