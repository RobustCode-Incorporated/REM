<template>
  <div :class="cardClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  padding?: 'sm' | 'md' | 'lg'
}>()

const cardClass = computed(() => {
  const paddingMap = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  }

  return [
    'bg-white border border-border rounded-xl shadow-sm',
    paddingMap[props.padding || 'md']
  ].join(' ')
})
</script>