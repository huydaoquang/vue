import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import Login from "../views/UserLogin.vue";
import Register from "../views/UserRegister.vue";
import ProductManagement from "../views/ProductManagement.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/login", component: Login },
	{ path: "/register", component: Register },
	{ path: "/products", component: ProductManagement },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
