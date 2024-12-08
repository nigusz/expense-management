<template>
  <div>
    <label :for="label" class="block font-medium text-sm/6 text-gray-90">{{ label }}</label>
    <div class="mt-1">
      <textarea
        v-bind="$attrs"
        :id="label"
        :placeholder="placeholder"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 resize-none"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div class="h-1 p-1">
        <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
});
defineProps({
  label: {
    type: String,
    default: ""
  },
  placeholder: String,
  modelValue: {
    type: [String, Number],
    default: ""
  },
  errorMessage: {
    type: String,
    default: "This field is required"
  }
});
</script>
