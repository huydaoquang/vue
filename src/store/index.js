// src/store.js
import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
	state() {
		return {
			user: null,
			token: localStorage.getItem("accessToken") || null,
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
				const response = await axios.post(
					`${process.env.VUE_APP_API_URL}/login`,
					{
						username,
						password,
					}
				);

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
		async register({ commit }, { username, password }) {
			try {
				const response = await axios.post(
					`${process.env.VUE_APP_API_URL}/register`,
					{
						username,
						password,
					}
				);

				console.log("response::::", response);

				const { user, access_token, refresh_token } = response.data;
				console.log("res", { user, access_token, refresh_token });

				commit("SET_USER", user);
				commit("SET_TOKEN", access_token);

				localStorage.setItem("accessToken", access_token);
				localStorage.setItem("refreshToken", refresh_token);
				localStorage.setItem("user", user);
			} catch (error) {
				console.error("Register failed:", error);
				throw error;
			}
		},
		async logout({ commit }) {
			try {
				await axios.post(
					`${process.env.VUE_APP_API_URL}/logout`,
					{},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				commit("LOGOUT");
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
			} catch (error) {
				console.error("Logout failed:", error);
			}
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
