<script setup lang="ts">
import { ref } from 'vue';
import type { Experience } from '../types/resume';

const props = defineProps<{
  modelValue: Experience[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Experience[]): void;
}>();

const addExperience = () => {
  emit('update:modelValue', [
    ...props.modelValue,
    {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);
};

const removeExperience = (index: number) => {
  const newExperience = [...props.modelValue];
  newExperience.splice(index, 1);
  emit('update:modelValue', newExperience);
};

const updateExperience = (index: number, field: keyof Experience, value: string) => {
  const newExperience = [...props.modelValue];
  newExperience[index] = { ...newExperience[index], [field]: value };
  emit('update:modelValue', newExperience);
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md mt-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Work Experience</h2>
      <button
        @click="addExperience"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Experience
      </button>
    </div>
    <div v-for="(exp, index) in modelValue" :key="index" class="mb-6 p-4 border rounded">
      <div class="flex justify-end">
        <button
          @click="() => removeExperience(index)"
          class="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              :value="exp.company"
              @input="(e) => updateExperience(index, 'company', (e.target as HTMLInputElement).value)"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              :value="exp.position"
              @input="(e) => updateExperience(index, 'position', (e.target as HTMLInputElement).value)"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              :value="exp.startDate"
              @input="(e) => updateExperience(index, 'startDate', (e.target as HTMLInputElement).value)"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              :value="exp.endDate"
              @input="(e) => updateExperience(index, 'endDate', (e.target as HTMLInputElement).value)"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            :value="exp.description"
            @input="(e) => updateExperience(index, 'description', (e.target as HTMLTextAreaElement).value)"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>