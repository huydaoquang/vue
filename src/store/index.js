import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			user: null,
			products: [],
		};
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		addProduct(state, product) {
			state.products.push(product);
		},
		updateProduct(state, { id, updatedProduct }) {
			const index = state.products.findIndex((product) => product.id === id);
			if (index !== -1) {
				state.products[index] = updatedProduct;
			}
		},
		deleteProduct(state, id) {
			state.products = state.products.filter((product) => product.id !== id);
		},
	},
});

export default store;
