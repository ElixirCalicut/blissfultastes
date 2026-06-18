import { createSlice } from "@reduxjs/toolkit";
import { fetchSettingsApi, postData } from "../../thunks/Thunks";

export const settingSlice = createSlice({
  name: "settings",
  initialState: {
    settingdetails: {},
    status: "idle",
  },
  reducers: {
    saveSettings: (state, action) => {
      state.settingdetails = action.payload;
      localStorage.setItem("settings", JSON.stringify(state.settingdetails));
    },
    getSettings: (state, action) => {
      state.settingdetails = action.payload;
      //localStorage.setItem("settings", JSON.stringify(state.settingdetails));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettingsApi.fulfilled, (state, action) => {
      state.status = "idle";
      state.settingdetails = action.payload;
    });
    builder.addCase(postData.pending, (state, action) => {
      state.status = "loading";
      state.settingdetails = action.payload;
    });

    builder.addCase(postData.fulfilled, (state, action) => {
      state.status = "success";
      state.settingdetails = action.payload;
    });

    builder.addCase(postData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });



  },
});

// Export the reducer, either as a default or named export
export default settingSlice.reducer;
export const { saveSettings, getSettings } = settingSlice.actions;
