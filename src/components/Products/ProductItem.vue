<template>
	<div class="flex justify-between items-center border-b py-2">
		<div>
			<h4>{{ product.name }}</h4>
			<p>${{ product.price }}</p>
		</div>
		<button @click="deleteProduct" class="text-red-500">Delete</button>
	</div>
</template>

<script>
export default {
	props: {
		product: Object,
	},
	methods: {
		deleteProduct() {
			this.$emit("deleteProduct", this.product.id);
		},
	},
};
</script>
