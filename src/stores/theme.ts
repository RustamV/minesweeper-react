import { create } from "zustand";
import i18n from "../../i18n";
import bloodTheme from "../img/blood";
import defaultTheme from "../img/default";
import skyTheme from "../img/sky";
import sandTheme from "../img/sand";
import deathTheme from "../img/death";

type TTheme = {
    value: string;
    label: string;
};

type TImageTheme = {
    cell: string;
    flag: string;
    empty: string;
    mine: string;
    close: string;
    gear: string;
    happyFace: string;
    sadFace: string;
};

type TThemeStore = {
    theme: TTheme;
    imageTheme: TImageTheme;
    setTheme: (newTheme: TTheme) => void;
};

const themes: TTheme[] = [
    { value: "theme-default", label: i18n.t("default") },
    { value: "theme-blood", label: i18n.t("blood") },
    { value: "theme-sky", label: i18n.t("sky") },
    { value: "theme-sand", label: i18n.t("sand") },
    { value: "theme-death", label: i18n.t("death") },
];

const getImageTheme = (theme: TTheme) => {
    switch (theme.value) {
        case "theme-blood": {
            return bloodTheme;
        }
        case "theme-sky": {
            return skyTheme;
        }
        case "theme-sand": {
            return sandTheme;
        }
        case "theme-death": {
            return deathTheme;
        }
        default: {
            return defaultTheme;
        }
    }
};

const useTheme = create<TThemeStore>((set) => ({
    theme: themes[0],
    imageTheme: defaultTheme,
    setTheme: (newTheme: TTheme) =>
        set({ theme: newTheme, imageTheme: getImageTheme(newTheme) }),
}));

export { useTheme, themes };
