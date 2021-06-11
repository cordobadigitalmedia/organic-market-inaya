import { createSlice } from "@reduxjs/toolkit";
import { getStateFromStorage, saveStateToStorage } from "../store/localStorage";

const dataSlice = createSlice({
  name: "cart",
  initialState: getStateFromStorage("cartState", {
    items: [],
    totalItems: 0,
    totalAmount: 0,
    showCart: false,
  }),
  reducers: {
    show(state, action) {
      state.showCart = !action.payload;
      return state;
    },
    hide(state, action) {
      state.showCart = false;
      return state;
    },
    reset(state) {
      state = { items: [], totalItems: 0, totalAmount: 0, showCart: false };
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
      console.log(action.payload.fields);
      state.totalAmount += action.payload.fields["Price"];
      state.totalItems++;
      state.showCart = true;
      saveStateToStorage(state, "cartState");
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
          state.totalAmount -= action.payload.fields["Price"];
        }
      }
      state.showCart = true;
      saveStateToStorage(state, "cartState");
      return state;
    },
  },
});
export const { show, add, remove, reset, hide } = dataSlice.actions;
export default dataSlice.reducer;
