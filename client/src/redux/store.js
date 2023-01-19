import Logined from "./slice/loginstate";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    islogin: Logined.reducer,
  },
});
export default store;
