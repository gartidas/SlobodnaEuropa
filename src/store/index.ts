import { configureStore } from "@reduxjs/toolkit";
import { articlesSlice } from "./articlesSlice";
import { useDispatch, useSelector } from "react-redux";
import { authorsSlice } from "./authorsSlice";

const store = configureStore({
  reducer: {
    articlesState: articlesSlice.reducer,
    authorsState: authorsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
