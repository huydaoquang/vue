// src/axios.js
import axios from "axios";
import store from "./store"; // Import store để gọi action logout

const api = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

// Interceptor cho yêu cầu
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Interceptor cho phản hồi
api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		// Kiểm tra nếu lỗi do token hết hạn
		if (error.response && error.response.status === 401) {
			try {
				// Gọi action refresh token
				await store.dispatch("refreshToken");

				// Lấy lại token mới
				const token = localStorage.getItem("accessToken");

				// Thử lại yêu cầu ban đầu với token mới
				error.config.headers.Authorization = `Bearer ${token}`;
				return api.request(error.config); // Gọi lại yêu cầu gốc
			} catch (refreshError) {
				// Nếu refresh token không thành công, gọi logout
				await store.dispatch("logout");
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default api;
