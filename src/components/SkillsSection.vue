<script setup lang="ts">
import { ref } from 'vue';
import type { Skill } from '../types/resume';

const props = defineProps<{
  modelValue: Skill[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Skill[]): void;
}>();

const addSkill = () => {
  emit('update:modelValue', [
    ...props.modelValue,
    {
      name: '',
      level: 1,
    },
  ]);
};

const removeSkill = (index: number) => {
  const newSkills = [...props.modelValue];
  newSkills.splice(index, 1);
  emit('update:modelValue', newSkills);
};

const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
  const newSkills = [...props.modelValue];
  newSkills[index] = { ...newSkills[index], [field]: value };
  emit('update:modelValue', newSkills);
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md mt-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Skills</h2>
      <button
        @click="addSkill"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Skill
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(skill, index) in modelValue"
        :key="index"
        class="p-4 border rounded flex items-center space-x-4"
      >
        <div class="flex-grow">
          <input
            type="text"
            :value="skill.name"
            @input="(e) => updateSkill(index, 'name', (e.target as HTMLInputElement).value)"
            placeholder="Skill name"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div class="w-24">
          <select
            :value="skill.level"
            @change="(e) => updateSkill(index, 'level', parseInt((e.target as HTMLSelectElement).value))"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
            <option value="4">Expert</option>
            <option value="5">Master</option>
          </select>
        </div>
        <button
          @click="() => removeSkill(index)"
          class="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>