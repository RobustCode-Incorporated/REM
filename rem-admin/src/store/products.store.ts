import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

type Product = {
  id: string
  name: string
  price: number
  stock: number
  created_at?: string
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)

  async function loadProducts() {
    loading.value = true
    try {
      const res = await api.get('/products')
      products.value = res.data
    } catch (err) {
      console.error('LOAD PRODUCTS ERROR:', err)
    } finally {
      loading.value = false
    }
  }

  async function createProduct(payload: {
    name: string
    price: number
    stock: number
  }) {
    const res = await api.post('/products', payload)

    if (res?.data) {
      products.value.unshift(res.data)
    }
  }

  async function deleteProduct(id: string | number) {
    await api.delete(`/products/${id}`)
    products.value = products.value.filter(p => p.id != id)
  }

  return {
    products,
    loading,
    loadProducts,
    createProduct,
    deleteProduct,
  }
})