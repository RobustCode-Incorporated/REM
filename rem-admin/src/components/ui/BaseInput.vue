<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm text-gray-600">
      {{ label }}
    </label>

    <input
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      class="border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary transition"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  placeholder?: string
  type?: string
}>()

const model = defineModel<string>()
</script>