<!-- src/components/Login.vue -->
<template>
	<div class="flex items-center justify-center h-screen bg-gray-100">
		<div class="bg-white p-8 rounded-lg shadow-md w-96">
			<h2 class="text-2xl font-bold text-center mb-6">Login</h2>
			<form @submit.prevent="handleLogin">
				<div class="mb-4">
					<label for="username" class="block text-sm font-medium text-gray-700"
						>Username:</label
					>
					<input
						type="text"
						v-model="username"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out p-2"
						placeholder="Enter your username"
					/>
				</div>
				<div class="mb-4">
					<label for="password" class="block text-sm font-medium text-gray-700"
						>Password:</label
					>
					<input
						type="password"
						v-model="password"
						required
						class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out p-2"
						placeholder="Enter your password"
					/>
				</div>
				<button
					type="submit"
					class="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out"
				>
					Login
				</button>
				<p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toastification";

export default {
	data() {
		return {
			username: "",
			password: "",
			error: null,
		};
	},
	methods: {
		...mapActions(["login"]),
		async handleLogin() {
			const toast = useToast();
			try {
				await this.login({
					username: this.username,
					password: this.password,
				});
				this.$router.push("/");
				toast.success("Đăng nhập thành công!");
			} catch (error) {
				this.error = "Đăng nhập thất bại! Vui lòng kiểm tra lại.";
			}
		},
	},
};
</script>
