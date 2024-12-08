<template>
  <div class="max-w-5xl px-6 py-4 mx-auto text-gray-600">
    <div class="flex items-center justify-between mb-2">
      <h1 class="mb-2 font-semibold">Expense List</h1>
      <button
        @click="showFilter = !showFilter"
        class="flex items-center gap-1 px-2 py-1 text-sm rounded-md hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 stroke-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        Filter
      </button>
    </div>
    <input
      v-if="showFilter"
      type="text"
      placeholder="Filter expenses by person"
      class="w-full px-4 py-2 mb-2 text-sm border border-gray-300 rounded-md min-w-64 focus:outline-none"
      v-model="personName"
      @input="handleFilter"
    />
    <div class="overflow-x-auto" v-if="expenses.length">
      <table class="w-full bg-white rounded-md table-auto">
        <thead>
          <tr class="border-b bg-slate-50 border-slate-200">
            <th class="px-6 py-3 text-sm font-medium text-left text-slate-900">Name</th>
            <th class="relative px-6 py-3 text-sm font-medium text-left text-slate-900" @click="sortExpenses('amount')">
              Amount
              <span v-if="sortBy === 'amount'" class="absolute ml-1 transform -translate-y-1/2 top-1/2">
                <svg
                  v-if="sortDirection === 'desc'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8l-8 8-8-8" />
                </svg>
                <svg
                  v-if="sortDirection === 'asc'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 20V4m8 8l-8-8-8 8" />
                </svg>
              </span>
            </th>
            <th class="px-6 py-3 text-sm font-medium text-left text-slate-900">Description</th>
            <th class="px-6 py-3 text-sm font-medium text-left text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in sortedExpenses" :key="expense.id" class="odd:bg-white even:bg-slate-50">
            <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{{ expense.name }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{{ expense.amount }}</td>
            <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{{ expense.description }}</td>
            <td class="px-6 py-4 space-x-4 text-sm whitespace-nowrap text-slate-600">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button @click="deleteExpense(expense.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="px-4 py-2 bg-white rounded-md">
      <p>No expenses found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  expenses: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(["filterName", "deleteExpense"]);
const showFilter = ref(false);
const personName = ref("");

const handleFilter = () => {
  emit("filterName", personName.value);
};

const sortBy = ref("");
const sortDirection = ref("");

const sortedExpenses = computed(() => {
  if (!sortBy.value || !sortDirection.value) {
    return [...props.expenses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return [...props.expenses].sort((a, b) => {
    return a[sortBy.value] - b[sortBy.value] * (sortDirection.value === "asc" ? 1 : -1);
  });
});

const sortExpenses = (column) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = column;
    sortDirection.value = "asc";
  }
};

// delete expense emit function
const deleteExpense = (id) => {
  emit("deleteExpense", id);
};

// TODO: edit expense emit function
</script>

<style scoped></style>
