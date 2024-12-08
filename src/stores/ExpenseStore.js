import { defineStore } from "pinia";

export const useExpenseStore = defineStore("expense", {
  state: () => ({
    expenses: []
  }),

  actions: {
    addExpense(expense) {
      this.expenses.push(expense);
      this.saveExpensesToLocalStorage();
    },

    deleteExpense(id) {
      this.expenses = this.expenses.filter((expense) => expense.id !== id);
      this.saveExpensesToLocalStorage();
    },

    async loadExpensesFromLocalStorage() {
      this.expenses = (await JSON.parse(localStorage.getItem("expenses"))) || [];
    },

    saveExpensesToLocalStorage() {
      localStorage.setItem("expenses", JSON.stringify(this.expenses));
    }
  },
  getters: {
    totalByPerson: (state) => {
      return state.expenses.reduce((totals, expense) => {
        totals[expense.name] = (totals[expense.name] || 0) + expense.amount;
        return totals;
      }, {});
    }
  }
});
