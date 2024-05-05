import axiosInstance from "../utils/axiosInstance";

export const accountService = {
  getAllAccount() {
    return axiosInstance.get(`/account/`);
  },
  register(payload = {}) {
    return axiosInstance.post(`/auth/register`, payload);
  },
  updateAcccountById(payload = {}) {
    return axiosInstance.put(`/account/update`, payload);
  },
};
