// import from lib
import { createApp } from "vue";
import { createPinia } from "pinia";

// import style
import "uno.css";
import "./style/base.css";

// import from src
import App from "./App.vue";
import router from "./router/index";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
