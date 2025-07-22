const API_BASE_URL = "http://localhost:5000/api/v1"

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // This ensures cookies are sent with requests
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.msg || "Something went wrong")
      }

      return data
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }

  // Auth methods
  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }

  async checkAuth() {
    return this.request("/auth/me")
  }

  // Product methods
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/products${queryString ? `?${queryString}` : ""}`)
  }

  async getProduct(slug) {
    return this.request(`/products/${slug}`)
  }

  async getFeaturedProducts() {
    return this.request("/products/featured")
  }

  async getProductsByCategory(categorySlug, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/products/category/${categorySlug}${queryString ? `?${queryString}` : ""}`)
  }

  // Category methods
  async getCategories() {
    return this.request("/category")
  }

  // Cart methods
  async getCart() {
    return this.request("/cart")
  }

  async addToCart(data) {
    return this.request("/cart/add", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateCartItem(itemId, data) {
    return this.request(`/cart/item/${itemId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async removeFromCart(itemId) {
    return this.request(`/cart/item/${itemId}`, {
      method: "DELETE",
    })
  }

  async clearCart() {
    return this.request("/cart/clear", {
      method: "DELETE",
    })
  }

  // Wishlist methods
  async getWishlist() {
    return this.request("/wishlist")
  }

  async addToWishlist(productId) {
    return this.request("/wishlist/add", {
      method: "POST",
      body: JSON.stringify({ productId }),
    })
  }

  async removeFromWishlist(productId) {
    return this.request(`/wishlist/${productId}`, {
      method: "DELETE",
    })
  }

  // Order methods
  async createOrder(orderData) {
    return this.request("/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async getMyOrders() {
    return this.request("/order/my")
  }

  // User methods
  async getProfile() {
    return this.request("/users/me")
  }

  async updateProfile(data) {
    return this.request("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
