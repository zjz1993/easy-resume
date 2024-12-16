<script setup lang="ts">
import type { Resume } from '../types/resume';

defineProps<{
  resume: Resume;
}>();
</script>

<template>
  <div id="pdf-content" class="bg-white p-8 max-w-[21cm] mx-auto">
    <!-- Personal Info -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold mb-2">{{ resume.personalInfo.fullName }}</h1>
      <div class="text-gray-600">
        <p>{{ resume.personalInfo.email }} | {{ resume.personalInfo.phone }}</p>
        <p>{{ resume.personalInfo.location }}</p>
      </div>
      <p class="mt-4 text-gray-700">{{ resume.personalInfo.summary }}</p>
    </div>

    <!-- Education -->
    <div v-if="resume.education.length" class="mb-8">
      <h2 class="text-2xl font-bold mb-4 border-b-2 border-gray-300">Education</h2>
      <div v-for="(edu, index) in resume.education" :key="index" class="mb-4">
        <div class="flex justify-between">
          <div>
            <h3 class="font-bold">{{ edu.school }}</h3>
            <p>{{ edu.degree }} in {{ edu.field }}</p>
          </div>
          <div class="text-gray-600">
            {{ edu.startDate }} - {{ edu.endDate }}
          </div>
        </div>
      </div>
    </div>

    <!-- Experience -->
    <div v-if="resume.experience.length" class="mb-8">
      <h2 class="text-2xl font-bold mb-4 border-b-2 border-gray-300">Work Experience</h2>
      <div v-for="(exp, index) in resume.experience" :key="index" class="mb-6">
        <div class="flex justify-between">
          <div>
            <h3 class="font-bold">{{ exp.position }}</h3>
            <p class="text-gray-700">{{ exp.company }}</p>
          </div>
          <div class="text-gray-600">
            {{ exp.startDate }} - {{ exp.endDate }}
          </div>
        </div>
        <p class="mt-2 text-gray-700">{{ exp.description }}</p>
      </div>
    </div>

    <!-- Skills -->
    <div v-if="resume.skills.length" class="mb-8">
      <h2 class="text-2xl font-bold mb-4 border-b-2 border-gray-300">Skills</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(skill, index) in resume.skills" :key="index">
          <span class="font-medium">{{ skill.name }}</span>
          <span class="text-gray-600"> - {{ ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'][skill.level - 1] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>