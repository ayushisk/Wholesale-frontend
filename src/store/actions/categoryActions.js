import axios from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategoryTree = createAsyncThunk(
  "categories/fetchTree",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/category/tree");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);
