import { createApp } from "vue";
import Toast from "vue-toastification";
import Flowbite from "flowbite-vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vue-toastification/dist/index.css";
import "./assets/tailwind.css";
import "flowbite/dist/flowbite.css";

createApp(App).use(router).use(store).use(Toast).use(Flowbite).mount("#app");
