<template>
	<form @submit.prevent="submit">
		<input
			v-model="product.name"
			type="text"
			placeholder="Product Name"
			class="border rounded p-2 w-full mb-2"
			required
		/>
		<input
			v-model="product.price"
			type="number"
			placeholder="Product Price"
			class="border rounded p-2 w-full mb-2"
			required
		/>
		<button type="submit" class="bg-blue-500 text-white rounded p-2">
			Add Product
		</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			product: {
				name: "",
				price: 0,
			},
		};
	},
	methods: {
		submit() {
			const newProduct = { ...this.product, id: Date.now() };
			this.$emit("addProduct", newProduct);
			this.product.name = "";
			this.product.price = 0;
		},
	},
};
</script>
