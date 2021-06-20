import { useEffect, useState } from "react";
import { useImageTheme } from "./index";
import { GetThemeOptions } from "../config";
import { useTranslation } from "react-i18next";

const useGameTheme = () => {
    const [theme, setTheme] = useState({});
    const [imageTheme] = useImageTheme(theme);
    const themeOptions = GetThemeOptions();
    const { t } = useTranslation();

    useEffect(() => {
        const LSTheme = localStorage.getItem("theme");
        const defaultTheme = findThemeByValue(LSTheme) ?? themeOptions[0];
        document.body.classList.add(defaultTheme.value);
        setTheme(defaultTheme);
    }, [t]);

    const findThemeByValue = (value) => {
        return themeOptions.find((item) => item.value === value);
    };

    const onChangeTheme = ({ value }) => {
        document.body.className = "";
        document.body.classList.add(value);
        setTheme(findThemeByValue(value));
        localStorage.setItem("theme", value);
    };

    return [theme, imageTheme, onChangeTheme];
};

export default useGameTheme;
