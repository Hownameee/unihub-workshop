import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { getAccessToken } from "../utils/token";

const api: AxiosInstance = axios.create({
	timeout: 5000,
	headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	config.headers.set("Authorization", `Bearer ${getAccessToken()}`);
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error(error);
		return Promise.reject(error);
	},
);

export default api;
