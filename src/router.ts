import Resume from "@/pages/resume/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", component: () => import("@/pages/index.vue") },
		{
			path: "/resume",
			component: () => import("@/pages/resume/index.vue"),
			name: "resume",
		},
	],
});
export default router;
