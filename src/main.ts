import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "nprogress/nprogress.css";
import "./styles/main.scss";

const app = createApp(App);
app.use(router);
app.mount("#app");
