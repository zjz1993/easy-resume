<script setup lang="ts">
import { ref } from 'vue';
import type { Education } from '../types/resume';

const props = defineProps<{
  modelValue: Education[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Education[]): void;
}>();

const addEducation = () => {
  emit('update:modelValue', [
    ...props.modelValue,
    {
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    },
  ]);
};

const removeEducation = (index: number) => {
  const newEducation = [...props.modelValue];
  newEducation.splice(index, 1);
  emit('update:modelValue', newEducation);
};

const updateEducation = (index: number, field: keyof Education, value: string) => {
  const newEducation = [...props.modelValue];
  newEducation[index] = { ...newEducation[index], [field]: value };
  emit('update:modelValue', newEducation);
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md mt-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Education</h2>
      <button
        @click="addEducation"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Education
      </button>
    </div>
    <div v-for="(edu, index) in modelValue" :key="index" class="mb-6 p-4 border rounded">
      <div class="flex justify-end">
        <button
          @click="() => removeEducation(index)"
          class="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">School</label>
          <input
            type="text"
            :value="edu.school"
            @input="(e) => updateEducation(index, 'school', (e.target as HTMLInputElement).value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Degree</label>
          <input
            type="text"
            :value="edu.degree"
            @input="(e) => updateEducation(index, 'degree', (e.target as HTMLInputElement).value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Field of Study</label>
          <input
            type="text"
            :value="edu.field"
            @input="(e) => updateEducation(index, 'field', (e.target as HTMLInputElement).value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              :value="edu.startDate"
              @input="(e) => updateEducation(index, 'startDate', (e.target as HTMLInputElement).value)"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              :value="edu.endDate"
              @input="(e) => updateEducation(index, 'endDate', (e.target as HTMLInputElement).value)"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>