// API Service per comunicazione con backend Flask
const API_BASE_URL = 'https://3dhkilcepgv6.manus.space/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Restaurants endpoints
  async getRestaurants(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = `/restaurants${queryString ? `?${queryString}` : ''}`
    return this.request(endpoint)
  }

  async getRestaurant(id) {
    return this.request(`/restaurants/${id}`)
  }

  async getRestaurantBySlug(slug) {
    return this.request(`/restaurants/slug/${slug}`)
  }

  async getRestaurantRankings(type = 'public') {
    return this.request(`/restaurants/rankings?type=${type}`)
  }

  async searchRestaurants(query) {
    return this.request(`/restaurants/search?q=${encodeURIComponent(query)}`)
  }

  // Food Bloggers endpoints
  async getFoodBloggers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = `/food-bloggers${queryString ? `?${queryString}` : ''}`
    return this.request(endpoint)
  }

  async getFoodBlogger(id) {
    return this.request(`/food-bloggers/${id}`)
  }

  async getTopBloggers(limit = 10) {
    return this.request(`/food-bloggers/top?limit=${limit}`)
  }

  // Expert Reviews endpoints
  async getExpertReviews(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = `/expert-reviews${queryString ? `?${queryString}` : ''}`
    return this.request(endpoint)
  }

  async getExpertReview(id) {
    return this.request(`/expert-reviews/${id}`)
  }

  async getFeaturedReviews(limit = 5) {
    return this.request(`/expert-reviews/featured?limit=${limit}`)
  }

  async createExpertReview(reviewData) {
    return this.request('/expert-reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    })
  }

  // Authentication endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  async getCurrentUser() {
    return this.request('/auth/me')
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }

  // Utility methods
  async uploadFile(file, endpoint) {
    const formData = new FormData()
    formData.append('file', file)

    return fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`)
      }
      return response.json()
    })
  }
}

// Export singleton instance
export const apiService = new ApiService()
export default apiService

