import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import routes from "./routes"

import App from "./components/App.vue";

const pinia = createPinia();

const router = createRouter( {
  history: createWebHistory(),
  routes: routes.routes
});

const app = createApp({
    components: {
      App,
    }
}).use(pinia).use(router);

app.mount("#app");
