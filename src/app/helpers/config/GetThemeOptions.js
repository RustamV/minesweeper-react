import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const GetThemeOptions = () => {
    const { t } = useTranslation("themes");

    const themeOptions = useMemo(() => {
        return [
            { value: "theme-default", label: t("default") },
            { value: "theme-blood", label: t("blood") },
            { value: "theme-sky", label: t("sky") },
            { value: "theme-sand", label: t("sand") },
            { value: "theme-death", label: t("death") },
        ];
    }, [t]);

    return themeOptions;
};

export default GetThemeOptions;
