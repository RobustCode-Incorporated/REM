import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export const useDashboardStore = defineStore('dashboard', () => {
  const kpis = ref({
    totalSales: 0,
    orders: 0,
    customers: 0,
    products: 0,
    stockAlerts: 0,
  })

  const loading = ref(false)

  async function loadKpis() {
    loading.value = true
    try {
      const res = await api.get('/dashboard/kpis')
      kpis.value = res.data
    } finally {
      loading.value = false
    }
  }

  return {
    kpis,
    loading,
    loadKpis,
  }
})