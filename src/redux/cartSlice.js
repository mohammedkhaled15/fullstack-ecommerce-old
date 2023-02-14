import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const indexOfSameProd = state?.products?.findIndex(
        (prod) => prod._id === action.payload._id
      );
      if (indexOfSameProd !== -1) {
        state.products[indexOfSameProd].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.quantity += 1;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    resetCart: () => initialState,
  },
});

export const { addProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
