import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/api";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.getProducts();
      return response.products; // Your backend returns { success, products, ... }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/products/${slug}`);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to load product"
      );
    }
  }
);

// export const fetchProductsByCategory = createAsyncThunk(
//   "products/fetchByCategory",
//   async (categorySlug, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get(`/products/category/${categorySlug}`);
//       return res.products;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         alert(err),
//         err.response?.data?.message || "Failed to fetch products"
//       );
//     }
//   }
// );

// ✅ createAsyncThunk version

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categorySlug, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/products/category/${categorySlug}`);
      return res.data.products; // ⬅️ this should match your backend
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products by category"
      );
    }
  }
);
