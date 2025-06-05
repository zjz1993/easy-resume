import type { Resume } from "@/types/resume.ts";
import { defineStore } from "pinia";
// import { computed, ref } from "vue";
export const useResumeStore = defineStore("resumeStore", {
	state: (): Resume => {
		return {
			name: "resume",
			personalInfo: {
				fullName: "qfullname的",
				email: "",
				phone: "",
				location: "",
				summary: "",
			},
			education: [],
			experience: [],
			skills: [],
		};
	},
});
