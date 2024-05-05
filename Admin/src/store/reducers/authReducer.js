import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";
import { authService } from "../../services/authServices";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const initialState = {
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
    updateOrder: false,
  },
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleLogout: (state) => {
      tokenMethod.remove();
      state.profile = null;
      message.success("Đăng xuất thành công");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading.getProfile = false;
      })
      .addCase(handleGetProfile.rejected, (state) => {
        state.loading.getProfile = false;
      })
      .addCase(handleGetProfile.pending, (state) => {
        state.loading.getProfile = true;
      });
  },
});

const { actions, reducer: authReducer } = authSlice;
export const { handleLogout } = actions;
export default authReducer;

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (loginData, { dispatch, getState, rejectWithValue }) => {
    try {
      const { email, password } = { ...loginData };
      const payload = { email: email, password: password };
      const res = await authService.login(payload);
      console.log("res :>> ", res);
      if (res?.data) {
        const { accessToken, refreshToken } = res.data || {};
        tokenMethod.set({ accessToken, refreshToken });
        dispatch(handleGetProfile());
        message.success("Đăng nhập thành công");

        return true;
      } else {
        message.error("Bạn không phải admin");
        throw false;
      }
    } catch (error) {
      message.warning("Đăng nhập lỗi!!");

      console.log("error :>> ", error);
    }
  }
);
export const handleGetProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue, dispatch }) => {
    if (tokenMethod.get()) {
      try {
        const profileRes = await authService.getProfile();
        // console.log("profileRes :>> ", profileRes?.data?.data);
        return profileRes?.data?.data;
      } catch (error) {
        console.log("lay profile khong thanh cong", rejectWithValue(error.message));
        return rejectWithValue(error.message);
      }
    }
  }
);
