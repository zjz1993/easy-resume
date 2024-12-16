import App from "@/pages/App.vue";
import { createApp } from "vue";
import "./root.css";
import router from "@/router.ts";

createApp(App).use(router).mount("#app");
