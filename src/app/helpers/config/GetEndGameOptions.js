import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const GetEndGameOptions = () => {
    const { t } = useTranslation("app");
    const endGameOptions = useMemo(() => {
        return [
            { id: 0, result: "win", label: t("win") },
            { id: 0, result: "lose", label: t("lose") },
        ];
    });
    return endGameOptions;
};

export default GetEndGameOptions;
