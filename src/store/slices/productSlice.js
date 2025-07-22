import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductBySlug,
  fetchProductsByCategory,
} from "../actions/productActions";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  filters: {
    category: "All",
    minPrice: 0,
    maxPrice: 100000,
    featured: false,
    active: false,
    inStock: false,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearProductDetails: (state) => {
      state.product = null;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // 📦 Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products.";
      })

      // 🔍 Fetch Product by Slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Product not found.";
      })

      // 📂 Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Category products failed to load.";
      });
  },
});

export const { updateProductFilters, clearProductDetails, clearProducts } =
  productSlice.actions;

export default productSlice.reducer;
