import { create } from "zustand";
import { axiosInstance } from "../api";

type TAuthStore = {
    isLoading: boolean;
    error: {
        message: string;
    } | null;
    data: {
        username: string;
        token: string;
        userId: string;
    } | null;
    register: (body: TRegisterBody) => Promise<boolean>;
    login: (body: TLoginBody) => void;
};

type TRegisterBody = {
    username: string;
    password: string;
};

type TLoginBody = {
    username: string;
    password: string;
};

const useAuthStore = create<TAuthStore>((set) => ({
    data: null,
    isLoading: false,
    error: null,
    register: async (body: TRegisterBody) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.post(`/auth/register`, body);

            set({ isLoading: false });
            return true;
        } catch (error) {
            console.log(error);

            set({
                error: { message: "Registration failed" },
                isLoading: false,
            });
            return false;
        }
    },
    login: async (body: TLoginBody) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post(`/auth/login`, body);
            set({
                data: {
                    username: body.username,
                    token: response.data.token,
                    userId: response.data.id,
                },
                isLoading: false,
            });
        } catch (error) {
            console.log(error);

            set({
                error: { message: "Login failed" },
                isLoading: false,
            });
        }
    },
}));

export { useAuthStore };
