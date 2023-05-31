import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("namaUser")
    ? JSON.parse(localStorage.getItem("namaUser"))
    : null,

  isAuthenticate: JSON.parse(localStorage.getItem("namaUser"))?.token
    ? true
    : false,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState: initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticate = true;
      window.localStorage.setItem("namaUser", JSON.stringify(action.payload));
    },
    userLogout: (state, action) => {
      state.isAuthenticate = false;
      window.localStorage.removeItem("namaUser");
    },
  },
});

export default authReducer.reducer;

export const { userLogin, userLogout } = authReducer.actions;

//   user: localStorage.getItem("AppUser")
//     ? JSON.parse(localStorage.getItem("AppUser"))
//     : null,
//   isAuthenticate: JSON.parse(localStorage.getItem("AppUser"))?.token
//     ? true
//     : false,
