import { createSlice, current } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  itemList: [],
};

const templateCartReducer = createSlice({
  name: "templateCartReducer",
  initialState: initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const inCart = state.itemList.find((item) => item.id === payload.id);
      !inCart
        ? state.itemList.push(payload)
        : message.error("Item alerady in the cart");
      !inCart && message.success("Item Added to the cart");
    },
    removeFromCart: (state, { payload }) => {
      state.itemList = state.itemList.filter((item) => item.id !== payload);
    },
  },
});

export default templateCartReducer.reducer;

export const { addToCart, removeFromCart } = templateCartReducer.actions;
