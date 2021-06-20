import { useEffect, useState } from "react";
import { GetLanguageOptions } from "../config";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
    const { t, i18n } = useTranslation("app");
    const languageOptions = GetLanguageOptions();
    const [currentLanguage, setCurrentLanguage] = useState({});

    useEffect(() => {
        const LSLanguage = localStorage.getItem("language");
        i18n.changeLanguage(LSLanguage);
        setCurrentLanguage(getLanguage(LSLanguage));
    }, []);

    useEffect(() => {
        setCurrentLanguage(getLanguage(i18n.language));
    }, [t]);

    const getLanguage = (value) => {
        return languageOptions.find((item) => item.value === value);
    };

    const onChangeLanguage = ({ value }) => {
        i18n.changeLanguage(value);
        localStorage.setItem("language", value);
    };

    return { currentLanguage, languageOptions, onChangeLanguage };
};

export default useLanguage;
