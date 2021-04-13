import { createSlice } from "@reduxjs/toolkit";
import { getStateFromStorage, saveStateToStorage } from "../store/localStorage";

const dataSlice = createSlice({
  name: "data",
  initialState: getStateFromStorage("dataState", {
    user: { email: "", name: "", phone: "" },
    recentOrders: [],
  }),
  reducers: {
    get(state, action) {
      return state;
    },
    resetRecent(state) {
      state.recentOrders = [];
      return state;
    },
    getUser(state, action) {
      return state.user;
    },
    saveRecentOrders(state,action) {
      state.recentOrders = action.payload;
      saveStateToStorage(state, "dataState");
      return state;
    },
    changeUser(state, action) {
      state.user = action.payload;
      saveStateToStorage(state, "dataState");
      return state;
    },
  },
});
export const { get, getUser, changeUser, saveRecentOrders, resetRecent } = dataSlice.actions;
export default dataSlice.reducer;
