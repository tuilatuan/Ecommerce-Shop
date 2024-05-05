import axiosInstance from "../utils/axiosInstance";

export const otherService = {
  getStatusOrder() {
    return axiosInstance.get(`/statusOrder/`);
  },
  getShippingType() {
    return axiosInstance.get(`/shippingType/`);
  },
  updateShippingType(payload = {}) {
    return axiosInstance.put(`/shippingType/`, payload);
  },
};
