<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div>
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="text-gray-500">Overview of your business activity</p>
    </div>

    <!-- KPI GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <BaseCard>
        <p class="text-sm text-gray-500">Total Sales</p>
        <h2 class="text-2xl font-bold">€12,450</h2>
      </BaseCard>

      <BaseCard>
        <p class="text-sm text-gray-500">Orders</p>
        <h2 class="text-2xl font-bold">128</h2>
      </BaseCard>

      <BaseCard>
        <p class="text-sm text-gray-500">Customers</p>
        <h2 class="text-2xl font-bold">54</h2>
      </BaseCard>

      <BaseCard>
        <p class="text-sm text-gray-500">Stock Alerts</p>
        <h2 class="text-2xl font-bold text-red-500">3</h2>
      </BaseCard>

    </div>

    <!-- OVERVIEW SECTION -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

      <!-- RECENT ACTIVITY -->
      <BaseCard>
        <h3 class="font-semibold mb-3">Recent Activity</h3>

        <ul class="space-y-2 text-sm text-gray-600">
          <li>✔ New order created</li>
          <li>✔ Stock updated</li>
          <li>✔ Customer added</li>
        </ul>
      </BaseCard>

      <!-- ANALYTICS -->
      <BaseCard>
        <h3 class="font-semibold mb-3">Analytics</h3>

        <div class="h-40 flex items-center justify-center text-gray-400">
          Chart coming soon
        </div>
      </BaseCard>

    </div>

  </div>
</template>

<script setup lang="ts">
import BaseCard from '../../components/ui/BaseCard.vue'
</script>