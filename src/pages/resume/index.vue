<script setup lang="ts">
import EducationSection from "@/components/EducationSection.vue";
import ExperienceSection from "@/components/ExperienceSection.vue";
import PersonalInfoSection from "@/components/PersonalInfoSection.vue";
import SkillsSection from "@/components/SkillsSection.vue";
import type { Resume } from "@/types/resume.ts";
import { generatePDF } from "@/utils/pdfExport";
import { getValidationErrors } from "@/utils/validation";
import { invoke } from "@tauri-apps/api/core";
import { ref } from "vue";
import { useRoute } from "vue-router";

const resume = ref<Resume>({
	personalInfo: {
		fullName: "",
		email: "",
		phone: "",
		location: "",
		summary: "",
	},
	education: [],
	experience: [],
	skills: [],
});

const greetMsg = ref("");
const name = ref("");

const saveResume = () => {
	const json = JSON.stringify(resume.value, null, 2);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "resume.json";
	a.click();
	URL.revokeObjectURL(url);
};

const exportPDF = () => {
	try {
		const errors = getValidationErrors(resume.value);
		if (errors.length > 0) {
			alert(`Please fix the following issues:\n\n${errors.join("\n")}`);
			return;
		}
		generatePDF(resume.value);
	} catch (error) {
		console.error("Failed to generate PDF:", error);
		alert(error instanceof Error ? error.message : "Failed to generate PDF");
	}
};

async function greet() {
	// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
	greetMsg.value = await invoke("greet", { name: name.value });
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">创建简历</h1>
        <div class="space-x-4">
          <router-link to="/">返回首页</router-link>
          <button
            @click="saveResume"
            class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            保存简历
          </button>
          <button
            @click="exportPDF"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Export PDF
          </button>
        </div>
      </div>

      <PersonalInfoSection v-model="resume.personalInfo" />
      <EducationSection v-model="resume.education" />
      <ExperienceSection v-model="resume.experience" />
      <SkillsSection v-model="resume.skills" />
    </div>
  </div>
</template>


