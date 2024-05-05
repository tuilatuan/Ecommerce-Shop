import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";
import { message } from "antd";
import { authService } from "../../services/authService";
import { handleGetCart } from "./cartReducer";

const initialState = {
  showedModal: false,
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
    handleShowModal: (state) => {
      state.showedModal = true;
    },
    handleCloseModal: (state) => {
      state.showedModal = false;
    },

    handleLogout: (state) => {
      tokenMethod.remove();
      state.profile = null;
      state.showedModal = false;
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
export const { handleShowModal, handleCloseModal, handleLogout } = actions;
export default authReducer;

export const handleRegister = createAsyncThunk(
  "auth/handleregister",
  async (registerData, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await authService.register(registerData);
      if (res?.status == 200) {
        dispatch(handleLogin({ email, password }));
        dispatch(handleCloseModal());
        message.success("Đăng ký thành công!!");
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (loginData, { dispatch, getState, rejectWithValue }) => {
    try {
      const { email, password } = { ...loginData };
      const payload = { email: email, password: password };
      const res = await authService.login(payload);
      // console.log("res :>> ", res?.data);
      if (res?.data) {
        const { accessToken, refreshToken } = res.data || {};
        tokenMethod.set({ accessToken, refreshToken });
        dispatch(handleCloseModal());
        dispatch(handleGetCart());
        dispatch(handleGetProfile());
        message.success("Đăng nhập thành công");
      }
      return true;
    } catch (error) {
      message.error("Sai mật khẩu hoặc tài khoản");
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
