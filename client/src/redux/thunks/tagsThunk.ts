import API_BASE_URL from "@/config";
import getCookie from "@/src/utils/getCookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const getTags = createAsyncThunk("user/getTags", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`);

    if (!response.data) {
      throw new AxiosError();
    }

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export { getTags };
