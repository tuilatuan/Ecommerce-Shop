import axios from "axios";

import tokenMethod from "./token";
import { BASE_URL } from "../contants/environment";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !!!originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.put("/auth/refresh", {
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        const { accessToken, refreshToken } = res.data.data || {};
        tokenMethod.set({
          accessToken,
          refreshToken,
        });
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        // Xử lý lỗi nếu không thể cập nhật token mới
        tokenMethod.remove();
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    // xử lý yêu cầu trước khi gửi đi
    config.headers.authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  (error) => {
    // xử lý lỗi nếu có
    return Promise.reject(error);
  }
);
export default axiosInstance;
