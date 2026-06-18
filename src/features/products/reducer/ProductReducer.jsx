import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularProducts, fetchProductData, fetchProductsByCategory } from "../../thunks/Thunks";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    filteredData: [],
    popular:[],
    status: "idle",
    popularstatus: "idle",
    popularerror: null,
    query: '',
    error: null,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
      state.filteredData = state.data.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.filteredData = action.payload;
      }) 
      .addCase(fetchPopularProducts.pending, (state) => {
        state.popularstatus = "loading";
      })
      .addCase(fetchPopularProducts.fulfilled, (state, action) => {
        state.popularstatus = "success";
        state.popular = action.payload;
        state.popular = action.payload;
      })
      .addCase(fetchPopularProducts.rejected, (state, action) => {
        state.popularstatus = "failed";
        state.popularerror = action.error.message;
      })

  },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
