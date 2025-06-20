import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile } from "../thunks/userThunk";
import { User } from "@/src/types/types";
import { Status } from "@/src/types/loadingStatus";

interface UserState {
  user: User | null;
  status: Status;
}

const initialState: UserState = {
  user: null,
  status: Status.Loading,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
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

export const { setUser } = userSlice.actions;