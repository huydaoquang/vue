// src/store.js
import { createStore } from "vuex";
import api from "../axios";

const store = createStore({
	state() {
		return {
			user: localStorage.getItem("user") || null,
			token: localStorage.getItem("accessToken") || null,
			employees: [],
			isLoading: false,
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
			state.employees = [];
		},
		SET_EMPLOYEES(state, employees) {
			state.employees = employees; // Gán danh sách nhân viên vào state
		},
		SET_LOADING(state, isLoading) {
			state.isLoading = isLoading; // Cập nhật trạng thái loading
		},
	},
	actions: {
		async login({ commit }, username, password) {
			try {
				const response = await api.post(`/login`, {
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
		async register({ commit }, { username, password }) {
			try {
				const response = await api.post(`/register`, {
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
				console.error("Register failed:", error);
				throw error;
			}
		},
		async refreshToken({ commit }) {
			try {
				const response = await api.post(`/refresh-token`, {
					refresh_token: localStorage.getItem("refreshToken"),
				});
				const { access_token } = response.data;
				commit("SET_TOKEN", access_token);
				localStorage.setItem("accessToken", access_token);
			} catch (error) {
				console.error("Refresh token failed:", error);
				throw error; // Hoặc logout nếu cần
			}
		},
		async logout({ commit }) {
			try {
				// Gọi API logout nếu cần
				await api.post(
					`/logout`,
					{},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
			} catch (error) {
				console.error("Logout failed:", error);
				// Có thể xử lý thêm thông báo hoặc logic khác nếu logout thất bại
			} finally {
				// Thực hiện logout trong Vuex
				commit("LOGOUT");
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("user");
			}
		},

		async fetchEmployees({ commit }, { page = 1, limit = 10 }) {
			try {
				commit("SET_LOADING", true);
				const response = await api.get(`/employees-limit`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
					params: {
						page,
						limit,
					},
				});
				console.log("response::::::", response.data);
		
				commit("SET_EMPLOYEES", response.data);
			} catch (error) {
				console.error("Fetch employees failed:", error);
			} finally {
				commit("SET_LOADING", false); // Kết thúc loading
			}
		}
		
	},
	getters: {
		isAuthenticated(state) {
			return !!state.token;
		},
		getUser(state) {
			return state.user;
		},
		getEmployees(state) {
			return state.employees;
		},
	},
});

export default store;
