<script setup lang="ts">
import { ref } from 'vue';
import type { PersonalInfo } from '../types/resume';

const props = defineProps<{
  modelValue: PersonalInfo;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: PersonalInfo): void;
}>();

const updateField = (field: keyof PersonalInfo, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Personal Information</h2>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          :value="modelValue.fullName"
          @input="(e) => updateField('fullName', (e.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          :value="modelValue.email"
          @input="(e) => updateField('email', (e.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          :value="modelValue.phone"
          @input="(e) => updateField('phone', (e.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          :value="modelValue.location"
          @input="(e) => updateField('location', (e.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Summary</label>
        <textarea
          :value="modelValue.summary"
          @input="(e) => updateField('summary', (e.target as HTMLTextAreaElement).value)"
          rows="4"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  </div>
</template>