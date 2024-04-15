import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, logIn } from "../thunks/userThunk";
import { User } from "@/src/types/types";

enum Status {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as User,
    status: Status.Loading,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.user = action.payload;
      })
      .addCase(getMyProfile.rejected, (state) => {
        state.status = Status.Error;
      })
      .addCase(logIn.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(logIn.fulfilled, (state) => {
        state.status = Status.Success;
      })
      .addCase(logIn.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});
