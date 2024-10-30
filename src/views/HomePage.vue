<template>
	<div class="text-center">
		<h1 class="text-4xl">Welcome to Vue CRUD App</h1>
		<router-link to="/login" class="text-blue-500">Login</router-link>
		<router-link to="/register" class="text-blue-500">Register</router-link>
		<router-link to="/products" class="text-blue-500"
			>Manage Products</router-link
		>
	</div>
</template>

<script>
export default {
	name: "HomePage",
};
</script>
