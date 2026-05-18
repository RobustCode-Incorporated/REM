<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div>
      <h1 class="text-2xl font-bold">Inventory</h1>
      <p class="text-gray-500">Manage products and stock levels</p>
    </div>

    <!-- CREATE PRODUCT -->
    <BaseCard class="space-y-4">
      <h3 class="font-semibold">Add Product</h3>

      <input
        v-model="name"
        placeholder="Product name"
        class="border p-2 rounded w-full"
      />

      <input
        v-model.number="price"
        type="number"
        placeholder="Price"
        class="border p-2 rounded w-full"
      />

      <input
        v-model.number="stock"
        type="number"
        placeholder="Stock"
        class="border p-2 rounded w-full"
      />

      <BaseButton @click="createProduct">
        Add Product
      </BaseButton>
    </BaseCard>

    <!-- PRODUCT LIST -->
    <BaseCard>
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-500 border-b">
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in store.products"
            :key="p.id"
            class="border-b"
          >
            <td>{{ p.name }}</td>
            <td>€{{ p.price }}</td>
            <td>{{ p.stock }}</td>

            <td>
              <span
                :class="p.stock <= 5 ? 'text-red-500' : 'text-green-600'"
              >
                {{ p.stock <= 5 ? 'LOW' : 'OK' }}
              </span>
            </td>

            <td>
              <button
                class="text-red-500"
                @click="store.deleteProduct(p.id)"
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
import BaseCard from '../../components/ui/BaseCard.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import { useProductsStore } from '../../store/products.store'

const store = useProductsStore()

const name = ref('')
const price = ref(0)
const stock = ref(0)

function createProduct() {
  if (!name.value || price.value <= 0) return

  store.addProduct({
    name: name.value,
    price: price.value,
    stock: stock.value,
  })

  name.value = ''
  price.value = 0
  stock.value = 0
}

onMounted(() => {
  store.loadProducts()
})
</script>