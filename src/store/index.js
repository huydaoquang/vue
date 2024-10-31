// src/store.js
import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
	state() {
		return {
			user: null,
			token: null,
		};
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		SET_TOKEN(state, token) {
			state.token = token;
		},
		LOGOUT(state) {
			state.user = null;
			state.token = null;
		},
	},
	actions: {
		async login({ commit }, username, password) {
			try {
				const response = await axios.post("http://127.0.0.1:5000/login", {
					username,
					password,
				});

				console.log("response::::", response);

				const { user, access_token, refresh_token } = response.data;
				console.log("res", { user, access_token, refresh_token });

				commit("SET_USER", user);
				commit("SET_TOKEN", access_token);

				localStorage.setItem("accessToken", access_token);
				localStorage.setItem("refreshToken", refresh_token);
				localStorage.setItem("user", user);
			} catch (error) {
				console.error("Login failed:", error);
				throw error;
			}
		},
		logout({ commit }) {
			commit("LOGOUT");
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
		},
	},
	getters: {
		isAuthenticated(state) {
			return !!state.token;
		},
		getUser(state) {
			return state.user;
		},
	},
});

export default store;
