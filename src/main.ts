import App from "@/pages/App.vue";
import { createApp } from "vue";
import "./root.css";
import router from "@/router.ts";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
