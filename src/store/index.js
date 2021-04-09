
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import dataSlice from './data.store.js';
import cartSlice from './cart.store.js';

const reducer = combineReducers({ data: dataSlice, cart: cartSlice });
const store = configureStore({ reducer });

export default store;