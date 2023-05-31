import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceRequest: {},
};

const addServiceRequestReducer = createSlice({
  name: "serviceRequest",
  initialState: initialState,
  reducers: {
    setaddServiceRequest: (state, action) => {
      state.serviceRequest = action.payload;
    },
  },
});

export const { setaddServiceRequest } = addServiceRequestReducer.actions;
export default addServiceRequestReducer.reducer;
