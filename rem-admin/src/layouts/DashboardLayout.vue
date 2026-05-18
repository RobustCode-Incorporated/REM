<template>
  <div class="flex">
    <Sidebar />

    <div class="flex-1">
      <Topbar />

      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/layout/Sidebar.vue'
import Topbar from '../components/layout/Topbar.vue'
</script>