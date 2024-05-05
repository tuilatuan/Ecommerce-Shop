import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { cartService } from "../../services/cartService";
import { message } from "antd";

const initialState = {
  cartInfo: {},
  cartLoading: false,
};

export const cartSlide = createSlice({
  initialState,
  name: "cart",
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleGetCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleGetCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartInfo = action.payload;
    });
    builder.addCase(handleGetCart.rejected, (state) => {
      state.cartLoading = false;
      state.cartInfo = {};
    });
    //addcart
    builder.addCase(handleAddCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleAddCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleAddCart.rejected, (state) => {
      state.cartLoading = false;
    });
    //remove cart
    builder.addCase(handleDeleteToCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleDeleteToCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleDeleteToCart.rejected, (state) => {
      state.cartLoading = false;
    });
    //updatecart
    builder.addCase(handleUpdateCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleUpdateCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleUpdateCart.rejected, (state) => {
      state.cartLoading = false;
    });
  },
});

const { actions, reducer: cartReducer } = cartSlide;
export const { updateCacheCart, clearCart } = actions;

export default cartReducer;

export const handleGetCart = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const cartRes = await cartService.getCart();
      if (cartRes) {
        console.log("Lấy dữ liệu cart thành công");
      }
      return cartRes.data?.carts;
    } catch (error) {
      rejectWithValue(error);
      console.log(" Lấy dữ liệu carterror :>> ", error);
    }
  }
);

export const handleAddCart = createAsyncThunk(
  "cart/add",
  async (acitonPayload, thunkApi) => {
    try {
      const { id_user, addedId, addedQuantity, subTotal } = acitonPayload;

      const cartState = thunkApi.getState();
      const cartList = cartState?.cart?.cartInfo || {};
      const index = cartList.findIndex((item) => item.id_product === addedId);

      if (index !== -1) {
        const { Product, id, id_product, id_user, quantity, subTotal } =
          cartList[index] || {};
        const { price } = Product || {};

        let quantityNew = quantity + addedQuantity;
        let newTotal = quantityNew * price;

        const payload = {
          id: id || "",
          id_user: id_user || "",
          id_product: addedId || "",
          updateQuantity: quantityNew || "",
          subTotal: newTotal || "",
        };
        thunkApi.dispatch(handleUpdateCart(payload));
      } else {
        console.log("khong");
        const payload = {
          id_user: id_user || "",
          id_product: addedId || "",
          quantity: addedQuantity || "",
          subTotal: subTotal || "",
        };
        const resAddCart = await cartService.addTocart(payload);
        if (resAddCart) {
          thunkApi.dispatch(handleGetCart());
          message.success("Add cart success");
        }
      }

      // return resAddCart?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Add to cart failed");
    }
  }
);

export const handleDeleteToCart = createAsyncThunk(
  "cart/removeProduct",
  async (acitonPayload, thunkApi) => {
    const { getState, dispatch, rejectWithValue } = thunkApi;
    try {
      const delRes = await cartService.deleteToCart(acitonPayload);
      if (delRes) {
        dispatch(handleGetCart());
        message.success("Remove from cart success");
      }
    } catch (error) {
      rejectWithValue(error);
      message.error("Remove from cart failed");
      console.log("error", error);
    }
  }
);

export const handleUpdateCart = createAsyncThunk(
  "cart/update",
  async (acitonPayload, thunkApi) => {
    const { getState, dispatch, rejectWithValue } = thunkApi;
    try {
      const { id, id_product, id_user, subTotal, updateQuantity } =
        acitonPayload || {};
      const payload = {
        id,
        id_product,
        id_user,
        subTotal,
        quantity: updateQuantity,
      };
      const resUpdate = await cartService.updateToCart(payload);
      if (resUpdate.status == 200) {
        dispatch(handleGetCart());
        message.success("Update cart sucess");
      }
    } catch (error) {
      rejectWithValue(error);
      message.error("Update from cart failed");
      console.log("error", error);
    }
  }
);
