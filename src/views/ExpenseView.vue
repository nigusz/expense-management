<template>
  <div class="min-h-screen bg-gray-100">
    <AppHeader />
    <AddExpenseForm @addExpense="createExpense" />
    <ExpenseList :expenses="filteredExpenses" @filterName="setFilteredName" @deleteExpense="deleteExpense" />
    <ExpenseSummary :expenses="expenseStore.totalByPerson" />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";

import AppHeader from "../components/AppHeader.vue";
import ExpenseList from "../components/ExpenseList.vue";
import ExpenseSummary from "../components/ExpenseSummary.vue";
import AddExpenseForm from "../components/AddExpenseForm.vue";

import { useExpenseStore } from "../stores/ExpenseStore";
const expenseStore = useExpenseStore();

const personName = ref("");

const filteredExpenses = computed(() =>
  expenseStore.expenses.filter((expense) => expense.name.toLowerCase().includes(personName.value.toLowerCase()))
);

const deleteExpense = (id) => {
  expenseStore.deleteExpense(id);
};

const setFilteredName = (name) => {
  personName.value = name;
};

const createExpense = (expense) => {
  expenseStore.addExpense(expense);
};

onMounted(() => {
  expenseStore.loadExpensesFromLocalStorage();
});
</script>
<style scoped></style>
