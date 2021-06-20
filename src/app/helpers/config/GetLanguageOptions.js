import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const GetLanguageOptions = () => {
    const { t } = useTranslation("languages");

    const languageOptions = useMemo(() => {
        return [
            { id: 0, value: "en", label: t("en") },
            { id: 1, value: "ru", label: t("ru") },
            { id: 2, value: "fr", label: t("fr") },
        ];
    }, [t]);

    return languageOptions;
};

export default GetLanguageOptions;
