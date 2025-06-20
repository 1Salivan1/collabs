import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { tagSlice } from "./slices/tagSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    tags: tagSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
