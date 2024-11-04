<template>
	<div class="flex items-center justify-center h-screen bg-gray-100">
		<div class="bg-white p-8 rounded-lg shadow-md w-96">
			<h2 class="text-2xl font-bold text-center mb-6">Register</h2>
			<form @submit.prevent="handleRegister">
				<input
					v-model="username"
					type="text"
					placeholder="Username"
					class="border rounded p-2 w-full mb-2"
					required
				/>
				<input
					v-model="password"
					type="password"
					placeholder="Password"
					class="border rounded p-2 w-full mb-2"
					required
				/>
				<button type="submit" class="bg-blue-500 text-white rounded p-2 w-full">
					Register
				</button>
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
		};
	},
	methods: {
		...mapActions(["register"]),
		async handleRegister() {
			const toast = useToast(); // Khởi tạo toast
			try {
				await this.register({
					username: this.username,
					password: this.password,
				});
				this.$router.push("/login");
				toast.success("Đăng ký thành công!");
			} catch (error) {
				console.error("Error:", error);
				toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
			}
		},
	},
};
</script>
