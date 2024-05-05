import axiosInstance from "../utils/axiosInstance";
import tokenMethod from "../utils/token";

export const authService = {
  login(payload = {}) {
    return axiosInstance.post(`/auth/loginadmin`, payload);
  },
  register(payload = {}) {
    return axiosInstance.post(`/auth/register`, payload);
  },
  checklogin(payload = {}) {
    return axiosInstance.post(`/auth/check-is-login`);
  },
  getProfile() {
    return axiosInstance.get(`/user/profile`, {
      headers: {
        authorization: `Bearer ${tokenMethod.get()?.accessToken}`,
      },
    });
  },
};
