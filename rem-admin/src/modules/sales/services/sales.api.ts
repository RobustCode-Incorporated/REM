import { api } from '../../../services/api'

export const SalesAPI = {
  async getSales() {
    try {
      const res = await api.get('/sales')
      return res.data
    } catch (err) {
      console.error('GET SALES FAILED', err)
      throw err
    }
  },

  async createSale(payload: any) {
    try {
      const res = await api.post('/sales', payload)
      return res.data
    } catch (err) {
      console.error('CREATE SALE FAILED', err)
      throw err
    }
  },

  async deleteSale(id: string) {
    try {
      const res = await api.delete(`/sales/${id}`)
      return res.data
    } catch (err) {
      console.error('DELETE SALE FAILED', err)
      throw err
    }
  },
}