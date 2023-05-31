import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allConfigData: [],
  templateCategory: [],
};

const configDataReducer = createSlice({
  name: "configData",
  initialState: initialState,
  reducers: {
    setAllConfigData: (state, action) => {
      state.allConfigData = action.payload;
    },
    setTemplateCategory: (state, action) => {
      state.templateCategory = action.payload;
    },
  },
});

export const { setAllConfigData, setTemplateCategory } = configDataReducer.actions;
export default configDataReducer.reducer;
