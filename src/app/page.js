"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/LandingComponents/Banner";

import { checkAuthStatus } from "../store/slices/authSlice";
import { fetchCart } from "../store/slices/cartSlice";
import { fetchWishlist } from "../store/slices/wishlistSlice";
import ProductCategories from "@/Components/LandingComponents/product-categories";

export default function HomePage() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div>
      <Banner />
      <ProductCategories />
      {/* <FeaturedProducts /> */}
    </div>
  );
}
