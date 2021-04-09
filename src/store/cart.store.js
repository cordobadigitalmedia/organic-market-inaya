import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalAmount: 0,
    showCart: false,
  },
  reducers: {
    show(state, action) {
      state.showCart = !action.payload;
      return state;
    },
    add(state, action) {
      let found = false;
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
          found = true;
        }
        return item;
      });
      if (found === false) {
        state.items.push({
          id: action.payload.id,
          count: 1,
          product: action.payload,
        });
      }
      state.totalAmount += action.payload.fields["Price / Kg"];
      state.totalItems++;
      state.showCart = true;
      return state;
    },
    remove(state, action) {
      let found = false;
      let updatedItems = state.items.reduce((cumm, item) => {
        if (item.id === action.payload.id) {
          item.count--;
          found = true;
        }
        if (item.count > 0) {
          cumm.push(item);
        }
        return cumm;
      }, []);
      state.items = updatedItems;
      if (found) {
        if (state.totalItems > 0) {
          state.totalItems--;
        }
        if (state.totalAmount > 0) {
          state.totalAmount -= action.payload.fields["Price / Kg"];
        }
      }
      state.showCart = true;
      return state;
    },
  },
});
export const { show, add, remove } = dataSlice.actions;
export default dataSlice.reducer;