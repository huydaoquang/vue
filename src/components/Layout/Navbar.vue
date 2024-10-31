<template>
	<nav class="bg-blue-500 p-4">
		<div class="container mx-auto flex justify-between items-center">
			<div>
				<router-link
					to="/"
					exact-active-class="font-bold text-yellow-300"
					class="text-white font-bold text-lg"
					>Home</router-link
				>
			</div>
			<div class="hidden md:flex md:items-center space-x-8">
				<router-link
					v-if="!isAuthenticated"
					to="/login"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Login</router-link
				>
				<router-link
					v-if="!isAuthenticated"
					to="/register"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Register</router-link
				>
				<router-link
					to="/products"
					v-if="isAuthenticated"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Products</router-link
				>
				<router-link
					to="/listUser"
					v-if="isAuthenticated"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>List User</router-link
				>
				<div class="flex items-center gap-2 text-white" v-if="isAuthenticated">
					<DropdownMenu />
				</div>
			</div>
			<button
				@click="toggleMenu"
				class="md:hidden text-white focus:outline-none"
			>
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-7 6h7"
					></path>
				</svg>
			</button>
		</div>
		<div v-if="isMenuOpen" class="md:hidden">
			<router-link
				to="/login"
				exact-active-class="font-bold text-yellow-300"
				class="block text-white p-2"
				>Login</router-link
			>
			<router-link
				to="/register"
				exact-active-class="font-bold text-yellow-300"
				class="block text-white p-2"
				>Register</router-link
			>
			<router-link
				to="/products"
				exact-active-class="font-bold text-yellow-300"
				class="block text-white p-2"
				>Products</router-link
			>
		</div>
	</nav>
</template>
<script setup>
import DropdownMenu from "../Menu/MenuNavbar.vue"; // Import component DropdownMenu
</script>
<script>
import { mapGetters } from "vuex";
export default {
	name: "NavbarLayout",
	computed: {
		...mapGetters(["isAuthenticated"]), // Kết nối getter từ Vuex
	},
	data() {
		return {
			isMenuOpen: false,
			user: localStorage.getItem("user"),
		};
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
	},
};
</script>

<style scoped>
/* Bạn có thể thêm CSS tùy chỉnh cho Navbar ở đây nếu cần */
</style>
