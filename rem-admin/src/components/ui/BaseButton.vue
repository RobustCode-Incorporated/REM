<template>
  <button
    :class="[
      'px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2',
      variants[variant],
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}>()

const variants = {
  primary: 'bg-primary text-white hover:opacity-90',
  secondary: 'bg-secondary text-white hover:opacity-90',
  danger: 'bg-red-500 text-white hover:opacity-90'
}
</script>