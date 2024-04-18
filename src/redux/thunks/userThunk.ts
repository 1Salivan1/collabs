"use client";
import API_BASE_URL from "@/config";
import getCookie from "@/src/utils/getCookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const getMyProfile = createAsyncThunk("user/getMyProfile", async () => {
  if (getCookie("token") !== undefined) {
    try {
      const headers = {
        Authorization: `Bearer ${getCookie("token")}`,
      };

      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers,
      });

      if (!response.data) {
        throw new AxiosError();
      }
      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  }
});

// const logIn = createAsyncThunk(
//   "user/logIn",
//   async ({ email, password }: { email: string; password: string }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//         email,
//         password,
//       });
//       if (!response) {
//         throw new AxiosError();
//       }
//       const data = await response.data;
//       document.cookie = `token=${data}; max-age=2506000`;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return error.response.data.msg;
//       } else {
//         console.error("Error during registration:", error);
//       }
//     }
//   }
// );

export { getMyProfile };
