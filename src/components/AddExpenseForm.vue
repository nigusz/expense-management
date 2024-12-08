<template>
  <div class="max-w-5xl px-6 py-4 mx-auto mt-10">
    <div class="flex items-center justify-end">
      <button
        @click="showModal = true"
        class="flex items-center justify-end gap-1 px-4 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600 hover:duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add new expense
      </button>
    </div>
    <Teleport to="body">
      <ExpenseModal :show="showModal" @close="showModal = false">
        <template #header> Add new expense </template>
        <template #default>
          <form @submit.prevent="submitExpense">
            <div class="space-y-6">
              <BaseInput
                v-model="expenseData.name"
                label="Name"
                placeholder="Enter your name"
                :errorMessage="errors.name"
              />
              <BaseInput
                v-model.number="expenseData.amount"
                label="Amount"
                placeholder="Enter amount"
                type="number"
                :errorMessage="errors.amount"
              />
              <BaseTextarea
                v-model="expenseData.description"
                label="Description"
                placeholder="Description of expense"
                rows="3"
                :errorMessage="errors.description"
              />
            </div>
            <div class="flex justify-end gap-4 mt-6">
              <BaseButton type="button" variant="secondary" @click="closeModal()">Cancel</BaseButton>
              <BaseButton type="submit" variant="primary">Add expense</BaseButton>
            </div>
          </form>
        </template>
      </ExpenseModal>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  expense: Object
});

const emit = defineEmits(["addExpense"]);

import ExpenseModal from "./modal/ExpenseModal.vue";
import BaseInput from "./BaseInput.vue";
import BaseTextarea from "./BaseTextarea.vue";
import BaseButton from "./BaseButton.vue";

const showModal = ref(false);

// if we have expense data, set it to the form
const initialExpenseData = props.expense ? { ...props.expense } : { name: "", amount: 0, description: "" };

// const initialExpenseData = { name: "", amount: 0, description: "" };
const initialErrors = { name: "", amount: "", description: "" };

const expenseData = reactive({ ...initialExpenseData });
const errors = reactive({ ...initialErrors });

const resetData = () => {
  Object.assign(expenseData, initialExpenseData);
  Object.assign(errors, initialErrors);
};

const closeModal = () => {
  showModal.value = false;
  resetData();
};

const validateForm = () => {
  let isValid = true;

  if (!expenseData.name.trim()) {
    errors.name = "Name is required.";
    isValid = false;
  }
  if (!Number(expenseData.amount.toString().trim())) {
    errors.amount = "Amount is required.";
    isValid = false;
  }
  if (!expenseData.description.trim()) {
    errors.description = "Description is required.";
    isValid = false;
  }
  return isValid;
};

const submitExpense = () => {
  if (validateForm()) {
    const newExpense = {
      id: uuidv4(),
      ...expenseData,
      createdAt: new Date()
    };
    emit("addExpense", newExpense);
    closeModal();
  }
};
</script>

<style scoped></style>
