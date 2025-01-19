import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { BASE_URL } from "../helpers/constants";

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 1000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const { data } = useAuthStore.getState();

        if (data?.token) {
            config.headers.Authorization = `Bearer ${data.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { axiosInstance };
