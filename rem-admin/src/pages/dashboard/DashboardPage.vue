<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div>
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="text-gray-500">Real-time business overview</p>
    </div>

    <!-- KPI GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <BaseCard>
        <p class="text-sm text-gray-500">Total Sales</p>
        <h2 class="text-2xl font-bold">€{{ kpis.totalSales }}</h2>
      </BaseCard>

      <BaseCard>
        <p class="text-sm text-gray-500">Orders</p>
        <h2 class="text-2xl font-bold">{{ kpis.orders }}</h2>
      </BaseCard>

      <BaseCard>
        <p class="text-sm text-gray-500">Customers</p>
        <h2 class="text-2xl font-bold">{{ kpis.customers }}</h2>
      </BaseCard>

      <BaseCard>
        <p class="text-sm text-gray-500">Stock Alerts</p>
        <h2 class="text-2xl font-bold text-red-500">
          {{ kpis.stockAlerts }}
        </h2>
      </BaseCard>

    </div>

    <!-- OVERVIEW -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

      <BaseCard>
        <h3 class="font-semibold mb-3">Recent Activity</h3>

        <ul class="space-y-2 text-sm text-gray-600">
          <li>✔ System connected to backend</li>
          <li>✔ Sales module active</li>
          <li>✔ ERP architecture running</li>
        </ul>
      </BaseCard>

      <BaseCard>
        <h3 class="font-semibold mb-3">Analytics</h3>

        <div class="h-40 flex items-center justify-center text-gray-400">
          Live data coming soon
        </div>
      </BaseCard>

    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import BaseCard from '../../components/ui/BaseCard.vue'
import { useDashboardStore } from '../../store/dashboard.store'

// STORE
const store = useDashboardStore()

// KPI reactive (computed = clean + performant)
const kpis = computed(() => store.kpis)

// LOAD DATA
onMounted(async () => {
  try {
    await store.loadKpis()
  } catch (err) {
    console.error('DASHBOARD KPI LOAD FAILED:', err)
  }
})
</script>