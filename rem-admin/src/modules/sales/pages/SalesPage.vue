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

      <BaseButton
        @click="createSale"
        :disabled="store.loading"
      >
        {{ store.loading ? 'Creating...' : 'Create Sale' }}
      </BaseButton>

      <p v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </p>

    </BaseCard>

    <!-- SALES LIST -->
    <BaseCard>

      <div v-if="store.loadingSales" class="text-gray-400">
        Loading sales...
      </div>

      <div v-else-if="!sales.length" class="text-gray-400">
        No sales yet
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
            <td>{{ sale.id.slice(0, 6) }}</td>
            <td>{{ sale.customer_name ?? 'Unknown' }}</td>
            <td>€{{ sale.total }}</td>
            <td>{{ formatDate(sale.created_at) }}</td>

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
import { ref, onMounted, computed } from 'vue'
import BaseCard from '../../../components/ui/BaseCard.vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import { useSalesStore } from '../store/sales.store'
import { useProductsStore } from '../../../store/products.store'
import { useCustomersStore } from '../../../store/customers.store'

// STORES
const store = useSalesStore()
const productsStore = useProductsStore()
const customersStore = useCustomersStore()

// LOCAL STATE
const customerId = ref('')
const productIds = ref<string[]>([])
const error = ref('')

// COMPUTED DATA
const sales = computed(() => store.sales)
const products = computed(() => productsStore.products)
const customers = computed(() => customersStore.customers)

/**
 * LOAD ALL DATA
 */
onMounted(async () => {
  try {
    await Promise.all([
      store.loadSales(),
      productsStore.loadProducts(),
      customersStore.loadCustomers(),
    ])
  } catch (err) {
    console.error(err)
  }
})

/**
 * CREATE SALE
 */
async function createSale() {
  if (!customerId.value || productIds.value.length === 0) return

  try {
    await store.createSale({
      customer_id: customerId.value,
      products: productIds.value.map(id => ({
        productId: id,
        quantity: 1,
      })),
    })

    customerId.value = ''
    productIds.value = []
  } catch (err) {
    console.error(err)
    error.value = 'Failed to create sale'
  }
}

/**
 * DELETE SALE
 */
async function deleteSale(id: string) {
  try {
    await store.deleteSale(id)
  } catch (err) {
    console.error(err)
    error.value = 'Failed to delete sale'
  }
}

/**
 * FORMAT DATE
 */
function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
</script>