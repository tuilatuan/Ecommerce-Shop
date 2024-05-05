import axiosInstance from "../utils/axiosInstance";

export const orderService = {
  getAll(payload = {}) {
    return axiosInstance.get(`/order/`);
  },
  getOrderDetailByID(slug = "") {
    return axiosInstance.get(`/orderDetail/${slug}`);
  },
  updateStatus(payload = {}) {
    return axiosInstance.put(`/order/update`, payload);
  },
};
