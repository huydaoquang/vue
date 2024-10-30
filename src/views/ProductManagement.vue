<template>
	<div class="max-w-lg mx-auto mt-10">
		<h2 class="text-2xl mb-4">Product Management</h2>
		<ProductForm @addProduct="addProduct" />
		<div class="mt-4">
			<h3 class="text-xl">Product List</h3>
			<ul>
				<li v-for="product in products" :key="product.id">
					<ProductItem :product="product" @deleteProduct="deleteProduct" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import ProductForm from "../components/Products/ProductForm.vue";
import ProductItem from "../components/Products/ProductItem.vue";

export default {
	components: { ProductForm, ProductItem },
	computed: {
		products() {
			return this.$store.state.products;
		},
	},
	methods: {
		addProduct(product) {
			this.$store.commit("addProduct", product);
		},
		deleteProduct(id) {
			this.$store.commit("deleteProduct", id);
		},
	},
};
</script>
