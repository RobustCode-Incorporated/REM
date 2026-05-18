<template>
  <aside class="w-64 bg-primary text-white h-screen p-4 flex flex-col">
    <h1 class="text-2xl font-bold mb-10">REM</h1>

    <nav class="space-y-2 flex-1">

      <router-link
        to="/"
        class="block p-3 rounded-lg transition"
        :class="isActive('/')"
      >
        Dashboard
      </router-link>

      <router-link
        to="/sales"
        class="block p-3 rounded-lg transition"
        :class="isActive('/sales')"
      >
        Sales
      </router-link>

      <router-link
        to="/inventory"
        class="block p-3 rounded-lg transition"
        :class="isActive('/inventory')"
      >
        Inventory
      </router-link>

    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path ? 'bg-secondary' : 'hover:bg-secondary'
}
</script>