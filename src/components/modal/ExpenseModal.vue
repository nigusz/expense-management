<template>
  <Transition
    enter-from-class="scale-125 opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-200"
    leave-from-class="opacity-100"
    leave-to-class="scale-125 opacity-0"
  >
    <div class="fixed inset-0 grid modal-mask place-items-center bg-black/60" v-if="show">
      <div class="modal-container bg-white p-10 rounded w-[70vw] max-w-[400px]">
        <header class="mb-2 text-xl font-semibold">
          <slot name="header">Default header</slot>
        </header>
        <div>
          <slot>Defualt body</slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: Boolean
});
</script>
