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
					v-if="!token"
					to="/login"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Login</router-link
				>
				<router-link
					v-if="!token"
					to="/register"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Register</router-link
				>
				<router-link
					to="/products"
					v-if="token"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>Products</router-link
				>
				<router-link
					to="/listUser"
					v-if="token"
					exact-active-class="font-bold text-yellow-300"
					class="text-white"
					>List User</router-link
				>
				<div class="flex items-center gap-2 text-white" v-if="token">
					<img
						id="avatarButton"
						type="button"
						data-dropdown-toggle="userDropdown"
						data-dropdown-placement="bottom-start"
						class="w-10 h-10 rounded-full cursor-pointer"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeRCsVvBWpqMB7xG-St5geqC7R_E3io4ksuQ&s"
						alt="User dropdown"
					/>

					<!-- Dropdown menu -->
					<div
						id="userDropdown"
						class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
					>
						<div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
							<div>{{ user }}</div>
						</div>
						<ul
							class="py-2 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="avatarButton"
						>
							<li>
								<a
									href="#"
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>Dashboard</a
								>
							</li>
							<li>
								<a
									href="#"
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>Settings</a
								>
							</li>
							<li>
								<a
									href="#"
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>Earnings</a
								>
							</li>
						</ul>
						<div class="py-1">
							<a
								href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>Sign out</a
							>
						</div>
					</div>
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

<script>
export default {
	name: "NavbarLayout",

	data() {
		return {
			isMenuOpen: false,
			user: localStorage.getItem("user"),
			token: localStorage.getItem("accessToken"),
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
