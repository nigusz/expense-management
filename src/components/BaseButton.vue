<template>
  <button
    :class="[
      'flex items-center justify-end gap-1 px-4 py-2  transition-colors rounded-md hover:duration-150',
      variant === 'primary' ? 'bg-green-500 text-white hover:bg-green-600' : '',
      variant === 'secondary' ? 'text-gray-600 hover:bg-gray-100' : ''
    ]"
  >
    <slot>Submit</slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary"
  }
});
</script>

<style lang="scss" scoped></style>
