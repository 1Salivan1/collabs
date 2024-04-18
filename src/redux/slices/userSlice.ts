import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile } from "../thunks/userThunk";
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
      });
  },
});
