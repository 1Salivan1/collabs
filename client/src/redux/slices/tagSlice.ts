import { createSlice } from "@reduxjs/toolkit";
import { Status } from "@/src/types/loadingStatus";
import { Tag } from "@/src/types/types";
import { getTags } from "../thunks/tagsThunk";

interface TagsState {
  tags: Tag[];
  status: Status;
}

const initialState: TagsState = {
  tags: [],
  status: Status.Loading,
};

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state) => {
        state.status = Status.Error;
      });
  },
});
