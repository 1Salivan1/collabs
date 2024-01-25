import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    username: null,
    email: null,
    git: null,
    tags: [null],
    socials: [null],
    about: null,
  },
  reducers: {},
});

export default userSlice;
