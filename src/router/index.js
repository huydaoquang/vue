import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

import Home from "../views/HomePage.vue";
import Login from "../views/UserLogin.vue";
import Register from "../views/UserRegister.vue";
import ProductManagement from "../views/ProductManagement.vue";
import ListUser from "../views/ListUser.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/login", component: Login, meta: { requiresUnauth: true } },
	{ path: "/register", component: Register },
	{
		path: "/products",
		component: ProductManagement,
		meta: { requiresAuth: true },
	},
	{ path: "/listUser", component: ListUser, meta: { requiresAuth: true } },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const store = useStore();

	// Nếu route yêu cầu xác thực và người dùng chưa đăng nhập
	if (
		to.matched.some((record) => record.meta.requiresAuth) &&
		!store.getters.isAuthenticated
	) {
		next({ path: "/login" }); // Chuyển hướng về trang đăng nhập
	}
	// Nếu route yêu cầu không xác thực và người dùng đã đăng nhập
	else if (
		to.matched.some((record) => record.meta.requiresUnauth) &&
		store.getters.isAuthenticated
	) {
		next({ path: "/" }); // Chuyển hướng về trang chính
	} else {
		next(); // Tiếp tục
	}
});

export default router;
