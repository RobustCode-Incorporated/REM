import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const SalesAPI = {
  async getSales() {
    return (await axios.get(`${API_URL}/sales`)).data
  },

  async createSale(payload: any) {
    return (await axios.post(`${API_URL}/sales`, payload)).data
  },
}