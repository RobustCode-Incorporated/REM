import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export const useSalesStore = defineStore('sales', () => {
  const sales = ref<any[]>([])
  const loading = ref(false)

  async function loadSales() {
    loading.value = true
    try {
      const res = await api.get('/sales')
      sales.value = res.data
    } finally {
      loading.value = false
    }
  }

  async function createSale(payload: {
    customer_id: string
    products: { productId: string; quantity: number }[]
  }) {
    const res = await api.post('/sales', payload)
    sales.value.unshift(res.data)
  }

  async function deleteSale(id: string) {
    await api.delete(`/sales/${id}`)
    sales.value = sales.value.filter(s => s.id !== id)
  }

  return {
    sales,
    loading,
    loadSales,
    createSale,
    deleteSale,
  }
})