<template>
	<div class="max-w-md mx-auto mt-10">
		<h2 class="text-2xl">Register</h2>
		<form @submit.prevent="register">
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
				Register
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
		register() {
			// Logic for registering
			this.$store.commit("setUser", { email: this.email });
			this.$router.push("/");
		},
	},
};
</script>
