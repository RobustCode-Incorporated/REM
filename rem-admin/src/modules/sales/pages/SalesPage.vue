<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div>
      <h1 class="text-2xl font-bold">Sales</h1>
      <p class="text-gray-500">ERP Sales Management Module</p>
    </div>

    <!-- CREATE SALE -->
    <BaseCard class="space-y-4">

      <h3 class="font-semibold">Create Sale</h3>

      <select v-model="customerId" class="border p-2 rounded w-full">
        <option disabled value="">Select customer</option>

        <option v-for="c in customers" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>

      <div class="space-y-2">
        <label class="text-sm text-gray-500">Products</label>

        <div v-for="p in products" :key="p.id" class="flex gap-2">
          <input type="checkbox" :value="p.id" v-model="productIds" />
          <span>{{ p.name }} - €{{ p.price }}</span>
        </div>
      </div>

      <BaseButton @click="createSale" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Sale' }}
      </BaseButton>

      <p v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </p>

    </BaseCard>

    <!-- SALES LIST -->
    <BaseCard>

      <div v-if="loadingSales" class="text-gray-400">
        Loading sales...
      </div>

      <table v-else class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-500 border-b">
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="sale in sales" :key="sale.id" class="border-b">
            <td>{{ sale.id }}</td>
            <td>{{ sale.customer_name }}</td>
            <td>€{{ sale.total }}</td>
            <td>{{ sale.created_at }}</td>

            <td>
              <button
                class="text-red-500"
                @click="deleteSale(sale.id)"
              >
                delete
              </button>
            </td>
          </tr>
        </tbody>

      </table>

    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseCard from '../../../components/ui/BaseCard.vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import { SalesAPI } from '../services/sales.api'
import { api } from '../../../services/api'

// STATE
const sales = ref<any[]>([])
const customers = ref<any[]>([])
const products = ref<any[]>([])

const customerId = ref('')
const productIds = ref<string[]>([])

const loading = ref(false)
const loadingSales = ref(false)
const error = ref('')

// LOAD DATA
onMounted(async () => {
  await loadAll()
})

async function loadAll() {
  loadingSales.value = true

  try {
    const [salesRes, customersRes, productsRes] = await Promise.all([
      SalesAPI.getSales(),
      api.get('/customers'),
      api.get('/products'),
    ])

    sales.value = salesRes
    customers.value = customersRes.data
    products.value = productsRes.data

  } catch (e) {
    error.value = 'Failed to load data'
  }

  loadingSales.value = false
}

// CREATE SALE
async function createSale() {
  if (!customerId.value || productIds.value.length === 0) return

  loading.value = true
  error.value = ''

  try {
    await SalesAPI.createSale({
      customer_id: customerId.value,
      products: productIds.value.map(id => ({
        productId: id,
        quantity: 1
      }))
    })

    await loadAll()

    customerId.value = ''
    productIds.value = []

  } catch (e) {
    error.value = 'Failed to create sale'
  }

  loading.value = false
}

// DELETE
async function deleteSale(id: string) {
  try {
    await SalesAPI.deleteSale(id)
    await loadAll()
  } catch (e) {
    error.value = 'Failed to delete sale'
  }
}
</script>