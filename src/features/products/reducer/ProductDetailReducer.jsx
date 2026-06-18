import { createSlice } from "@reduxjs/toolkit";
import { fetchProductDetailByID } from "../../thunks/Thunks";

const productDetailSlice = createSlice({
  name: "productdetail",
  initialState: {
    data:{},
    selectedProduct:null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetailByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetailByID.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchProductDetailByID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export  const {selectProduct} = productDetailSlice.actions;
export default productDetailSlice.reducer;

