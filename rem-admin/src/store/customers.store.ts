import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref<any[]>([])
  const loading = ref(false)

  async function loadCustomers() {
    loading.value = true
    try {
      const res = await api.get('/customers')
      customers.value = res.data
    } finally {
      loading.value = false
    }
  }

  async function createCustomer(payload: { name: string; email?: string }) {
    const res = await api.post('/customers', payload)
    customers.value.unshift(res.data)
  }

  async function deleteCustomer(id: string) {
    await api.delete(`/customers/${id}`)
    customers.value = customers.value.filter(c => c.id !== id)
  }

  return {
    customers,
    loading,
    loadCustomers,
    createCustomer,
    deleteCustomer,
  }
})