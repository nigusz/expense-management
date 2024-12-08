<template>
  <div class="max-w-5xl px-6 py-4 mx-auto text-gray-600">
    <h1 class="mb-2 font-semibold">Expenses Summary</h1>
    <div class="overflow-x-auto">
      <table class="w-full bg-white rounded-md table-auto">
        <thead>
          <tr class="border-b bg-slate-50 border-slate-200">
            <th class="px-6 py-3 text-sm font-medium text-left text-slate-900">Name</th>
            <th class="px-6 py-3 text-sm font-medium text-left text-slate-900">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(total, person) in expenses" :key="person.name" class="odd:bg-white even:bg-slate-50">
            <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{{ person }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{{ total.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  expenses: Object
});
</script>

<style scoped></style>
