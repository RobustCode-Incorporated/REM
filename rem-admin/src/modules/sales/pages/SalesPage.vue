<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div>
      <h1 class="text-2xl font-bold">Sales</h1>
      <p class="text-gray-500">Create and manage sales</p>
    </div>

    <!-- CREATE SALE -->
    <BaseCard class="space-y-4">

      <h3 class="font-semibold">Create Sale</h3>

      <!-- CUSTOMER -->
      <select v-model="customerId" class="border p-2 rounded w-full">
        <option disabled value="">Select customer</option>
        <option
          v-for="c in store.customers"
          :key="c.id"
          :value="c.id"
        >
          {{ c.name }}
        </option>
      </select>

      <!-- PRODUCTS -->
      <div class="space-y-2">
        <label class="text-sm text-gray-500">Products</label>

        <div
          v-for="p in store.products"
          :key="p.id"
          class="flex items-center gap-2"
        >
          <input
            type="checkbox"
            :value="p.id"
            v-model="productIds"
          />
          <span>{{ p.name }} - €{{ p.price }}</span>
        </div>
      </div>

      <!-- BUTTON -->
      <BaseButton @click="createSale">
        Create Sale
      </BaseButton>

    </BaseCard>

    <!-- SALES LIST -->
    <BaseCard>

      <table class="w-full text-sm">
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
          <tr
            v-for="sale in store.sales"
            :key="sale.id"
            class="border-b"
          >
            <td>{{ sale.id }}</td>
            <td>{{ sale.customer?.name }}</td>
            <td>€{{ sale.total }}</td>
            <td>{{ sale.date }}</td>
            <td>
              <button
                class="text-red-500"
                @click="store.deleteSale(sale.id)"
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
import { ref } from 'vue'
import BaseCard from '../../../components/ui/BaseCard.vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import { useSalesStore } from '../store/sales.store'

const store = useSalesStore()

const customerId = ref('')
const productIds = ref<string[]>([])

function createSale() {
  if (!customerId.value || productIds.value.length === 0) return

  store.addSale(customerId.value, productIds.value)

  customerId.value = ''
  productIds.value = []
}
</script>