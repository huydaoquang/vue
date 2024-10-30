<template>
	<div class="max-w-md mx-auto mt-10">
		<h2 class="text-2xl">Login</h2>
		<form @submit.prevent="login">
			<input
				v-model="email"
				type="email"
				placeholder="Email"
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
				Login
			</button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		login() {
			// Logic for logging in
			this.$store.commit("setUser", { email: this.email });
			this.$router.push("/");
		},
	},
};
</script>
