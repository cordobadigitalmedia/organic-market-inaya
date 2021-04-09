import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const api = 'https://husam278-api-server.herokuapp.com/api';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const cats = await axios.get(`${api}/categories`);
  const prods = await axios.get(`${api}/products`);
  return { categories: cats.data.result, products: prods.data.result, activeCategory:  cats.data.result[0].name};
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    categories: [],
    products: [],
    activeCategory: '',
    activeProduct: '',
  },
  reducers: {
    get(state, action) {
      return state;
    },
    changeActiveCategory(state, action){
      state.activeCategory = action.payload;
      return state;
    },
    changeActiveProduct(state, action){
      console.log('inside change category');
      console.log(action.payload);
      state.activeProduct = action.payload;
      console.log(state.activeProduct);
      return state;
    }
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.categories = action.payload.categories;
      state.products = action.payload.products;
      state.activeCategory = action.payload.activeCategory;
      return state;
    },
  },
});
export const {get, changeActiveCategory, changeActiveProduct} = dataSlice.actions;
export default dataSlice.reducer;