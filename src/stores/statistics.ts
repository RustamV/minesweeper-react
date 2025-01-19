import { create } from "zustand";
import { axiosInstance } from "../api";
import { useAuthStore } from "./auth";

enum Result {
    WIN = "win",
    LOSE = "lose",
}

type TStatistics = {
    win: number;
    lose: number;
    averageTime: number;
};

type TRecord = {
    id: number;
    result: Result;
    date: string;
    time: number;
};

type TThemeStore = {
    statistics: TStatistics;
    records: TRecord[];
    addRecord: (body: TAddRecordBody) => Promise<void>;
    getStatistics: () => Promise<void>;
    isLoading: boolean;
    error: {
        message: string;
    } | null;
};

type TAddRecordBody = {
    result: Result;
    date: string;
    time: number;
};

const useStatistics = create<TThemeStore>((set) => ({
    statistics: {
        win: 0,
        lose: 0,
        averageTime: 0,
    },
    isLoading: false,
    error: null,
    records: [],
    getStatistics: async () => {
        set({ isLoading: true, error: null });
        try {
            const userId = useAuthStore.getState().data?.userId;
            const response = await axiosInstance.get(
                `/getUserStatistics?userId=${userId}`
            );

            const averageTime =
                response.data.reduce((acc, cur) => {
                    return acc + cur.time;
                }, 0) / response.data.length;

            set({
                records: response.data,
                statistics: response.data.reduce(
                    (acc, cur) => {
                        if (cur.result === Result.WIN) {
                            acc.win++;
                        } else if (cur.result === Result.LOSE) {
                            acc.lose++;
                        }
                        return acc;
                    },
                    {
                        win: 0,
                        lose: 0,
                        averageTime,
                    }
                ),
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
    addRecord: async (body: TAddRecordBody) => {
        try {
            const userId = useAuthStore.getState().data?.userId;
            await axiosInstance.post(`/addRecord`, {
                userId,
                ...body,
            });
        } catch (error) {
            console.log(error);
        }
    },
}));

export { useStatistics, Result };
