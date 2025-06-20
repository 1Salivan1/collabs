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

export { getMyProfile };
