"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Plus, Minus } from "lucide-react";
import { addToCart } from "../../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import { apiClient } from "../../lib/api";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPack, setSelectedPack] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.getProduct(slug);
        setProduct(response.product);
        if (response.product.packOptions?.length > 0) {
          setSelectedPack(response.product.packOptions[0]);
        }
      } catch (err) {
        setError(err.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  const isInWishlist = wishlistItems.some((item) => item._id === product?._id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return;
    }

    if (!selectedPack) {
      alert("Please select a pack option");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        quantity,
        selectedPack,
      })
    );
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      alert("Please login to add items to wishlist");
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  if (loading) return <div className="p-6">Loading product...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="bg-white py-10 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Images */}
        <div>
          <img
            src={
              product?.images?.[0] || "/placeholder.svg?height=500&width=500"
            }
            alt={product?.name}
            className="w-full h-[500px] object-cover rounded-md"
          />
          {product?.images?.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product?.images.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img || "/placeholder.svg"}
                  alt={`thumb-${i}`}
                  className="w-20 h-20 object-cover border rounded-md cursor-pointer hover:border-orange-500"
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Details */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {product?.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {product.shortDescription}
          </p>

          <div className="text-3xl font-bold text-orange-600 mt-4">
            ₹{selectedPack?.price || product.basePrice}
          </div>

          <div className="text-sm mt-1 text-gray-600">
            <strong>SKU:</strong> {product.sku}
          </div>

          {/* Pack Options */}
          {product.packOptions?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-gray-700">
                SELECT PACK SIZE
              </h4>
              <div className="space-y-2">
                {product.packOptions.map((pack, i) => (
                  <label
                    key={i}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="packOption"
                      checked={
                        selectedPack?.unit === pack.unit &&
                        selectedPack?.quantity === pack.quantity
                      }
                      onChange={() => setSelectedPack(pack)}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm">
                      {pack.quantity} {pack.unit} — ₹{pack.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-3">SELECT SIZE</h4>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-full px-4 py-2 text-sm transition-colors ${
                    selectedSize === size
                      ? "border-orange-600 bg-orange-50 text-orange-600"
                      : "border-gray-300 text-gray-700 hover:border-orange-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-3">QUANTITY</h4>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>ADD TO BAG</span>
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`px-6 py-3 rounded-md border transition flex items-center justify-center ${
                isInWishlist
                  ? "border-red-500 text-red-500 bg-red-50"
                  : "border-orange-600 text-orange-600 hover:bg-orange-50"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Stock Status */}
          <div className="mt-6 text-sm">
            <strong>Stock:</strong>{" "}
            <span
              className={`${
                product.stock?.status === "in_stock"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.stock?.status?.replace("_", " ") || "Unknown"} (Qty:{" "}
              {product.stock?.level || 0})
            </span>
          </div>

          {/* Categories */}
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>
              <strong>Primary Category:</strong>{" "}
              {product.primaryCategory?.name || "N/A"}
            </p>
            <p>
              <strong>All Categories:</strong>{" "}
              {product.categories?.map((cat) => cat?.name).join(", ") || "N/A"}
            </p>
          </div>

          {/* Description */}
          <div className="mt-6 text-sm text-gray-700">
            <h4 className="font-semibold mb-2">Description:</h4>
            <p>{product.description}</p>
          </div>

          {/* Offer Section */}
          <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700">BEST OFFERS</h4>
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li className="text-red-500 font-semibold">
                Best Price: ₹
                {Math.floor((selectedPack?.price || product.basePrice) * 0.65)}
              </li>
              <li>
                Coupon Discount: 35% off (Save ₹
                {Math.floor((selectedPack?.price || product.basePrice) * 0.35)})
              </li>
              <li>Applicable on orders above ₹699</li>
              <li>
                Use Coupon:{" "}
                <span className="font-bold text-gray-700">WHOLESALE35</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
