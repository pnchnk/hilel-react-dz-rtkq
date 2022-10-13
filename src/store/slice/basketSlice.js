import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basketItems: [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      let isInArray = false;
      let quantity = 1;
      let productID = `product${payload.id}`;

      // if product already exists in array
      state.basketItems?.forEach((el) => {
        if (el.id === payload.id) {
          isInArray = true;
          el.quantity++
        //   localStorage.setItem(
        //     productID,
        //     +localStorage.getItem(productID) + +quantity
        //   );
            
        }
      });

      if (!isInArray) {
        state.basketItems.push({ ...payload, quantity: 1 });
        // localStorage.setItem(
        //   productID,
        //   +localStorage.getItem(productID) + +quantity
        // );
      }
    },
    deleteFromCart: (state, { payload }) => {
      const {id} = payload;
      state.basketItems = state.basketItems.filter(item => item.id !== id);
    },
    buttonPlus: (state, { payload }) => {
      state.basketItems?.forEach((el) => {
        if (el.id === payload.id) {
          el.quantity++
        }
      });
    },
    buttonMinus: (state, { payload }) => {
      state.basketItems?.forEach((el) => {
        if (el.id === payload.id) {
          el.quantity--
        }
        if (el.quantity === 0){
          state.basketItems = state.basketItems.filter(item => item.id !== payload.id);
        }
      });
    },
    inputOnChange: (state, { payload }) => {
      
    },
  },
});

export const { addToCart, deleteFromCart, buttonPlus, buttonMinus } = basketSlice.actions;
export default basketSlice.reducer;
