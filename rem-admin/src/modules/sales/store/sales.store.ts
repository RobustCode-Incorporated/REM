import { defineStore } from 'pinia'
import { SalesAPI } from '../services/sales.api'

export const useSalesStore = defineStore('sales', {
  state: () => ({
    sales: [],
    loading: false,
  }),

  actions: {
    async fetchSales() {
      this.loading = true
      this.sales = await SalesAPI.getSales()
      this.loading = false
    },

    async createSale(data: {
      customer_id: string
      total: number
    }) {
      const newSale = await SalesAPI.createSale(data)
      this.sales.unshift(newSale)
    },
  },
})