<script setup lang="ts">
import EducationSection from "@/components/EducationSection.vue";
import ExperienceSection from "@/components/ExperienceSection.vue";
import PersonalInfoSection from "@/components/PersonalInfoSection.vue";
import SkillsSection from "@/components/SkillsSection.vue";
import { useResumeStore } from "@/models/useResumeStore.ts";
import { generatePDF } from "@/utils/pdfExport";
import { getValidationErrors } from "@/utils/validation";
import { invoke } from "@tauri-apps/api/core";
import { open, save } from "@tauri-apps/plugin-dialog";
import { ref } from "vue";

const resume = useResumeStore();

//const resume = ref<Resume>({
//	name: "resume",
//	personalInfo: {
//		fullName: "",
//		email: "",
//		phone: "",
//		location: "",
//		summary: "",
//	},
//	education: [],
//	experience: [],
//	skills: [],
//});

const greetMsg = ref("");
const name = ref("");

const loadResume = async () => {
	try {
		const selected = await open({
			filters: [
				{
					name: "简历文件",
					extensions: ["json"],
				},
			],
		});

		if (selected) {
			const content = await invoke("read_file", { path: selected });
			resume.value = JSON.parse(content as string);
		}
	} catch (error) {
		console.error("加载简历失败:", error);
		alert("加载简历失败");
	}
};

const saveResume = async () => {
	try {
		const filePath = await save({
			filters: [
				{
					name: "简历文件",
					extensions: ["json"],
				},
			],
		});

		if (filePath) {
			const json = JSON.stringify(resume.value, null, 2);
			await invoke("write_file", {
				path: filePath,
				contents: json,
			});
			alert("保存成功！");
		}
	} catch (error) {
		console.error("保存简历失败:", error);
		alert("保存简历失败");
	}
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
          <router-link to="/" class="text-blue-500 hover:text-blue-600">返回首页</router-link>
          <button
            @click="loadResume"
            class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            加载简历
          </button>
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
            导出PDF
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


