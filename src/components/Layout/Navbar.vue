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
			<div class="hidden md:flex space-x-8">
				<router-link
					to="/login"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Login</router-link
				>
				<router-link
					to="/register"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Register</router-link
				>
				<router-link
					to="/products"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Products</router-link
				>
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

<script>
export default {
	name: "NavbarLayout",
	data() {
		return {
			isMenuOpen: false,
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
