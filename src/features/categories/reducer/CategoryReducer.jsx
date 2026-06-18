import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../../thunks/Thunks";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    selectedCategory: null,
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
