import axiosInstance from "../utils/axiosInstance";

export const userService = {
  getAllUser(payload = {}) {
    return axiosInstance.get(`/user/`);
  },
  updateUser(payload = {}) {
    return axiosInstance.put(`/user/update`, payload);
  },
  deleteUser(payload = {}) {
    return axiosInstance.post(`/user/delete`, payload);
  },
};
