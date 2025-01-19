import { Select } from "..";
import { useTranslation } from "react-i18next";
import {
    ModalClose,
    ModalContent,
    ModalField,
    ModalHeader,
    ModalText,
    ModalTitle,
} from "../Modal/styles";
import { StyledModal } from "./styles";
import { Button } from "../Button/styles";
import { themes, useTheme } from "../../stores/theme";
import { useSettingsModal, useStatisticsModal } from "../../stores/modal";
import { sizeOptions, useFieldSize } from "../../stores/field-size";
import { useState } from "react";
import { languageOptions } from "../../helpers/constants/language";

const SettingsModal = () => {
    const { imageTheme } = useTheme();
    const { theme, setTheme } = useTheme();
    const { t, i18n } = useTranslation("app");
    const [currentLanguage, setCurrentLanguage] = useState(languageOptions[0]);
    const { closeModal, isOpen } = useSettingsModal();
    const { openModal } = useStatisticsModal();
    const { setSize, currentSizeOption } = useFieldSize();

    const handleStatisticsClick = () => {
        closeModal();
        openModal();
    };

    const handleChangeTheme = (option) => {
        setTheme(option);
    };

    const handleChangeFieldSize = (option) => {
        setSize(option.value);
    };

    const handleLanguageChange = (option) => {
        i18n?.changeLanguage(option.value);
        setCurrentLanguage(option);
    };

    return (
        <StyledModal
            isOpen={isOpen}
            className="modal"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
            onRequestClose={closeModal}
        >
            <ModalHeader>
                <ModalTitle>{t("settings")}</ModalTitle>

                <ModalClose>
                    <img src={imageTheme?.close} onClick={closeModal} alt="" />
                </ModalClose>
            </ModalHeader>
            <ModalContent>
                <ModalField>
                    <ModalText>{t("fieldSize")}</ModalText>
                    <Select
                        defaultValue={currentSizeOption}
                        value={currentSizeOption}
                        options={sizeOptions}
                        onChange={(option) => handleChangeFieldSize(option)}
                        className="select"
                        components={undefined}
                    />
                </ModalField>
                <ModalField>
                    <ModalText>{t("theme")}</ModalText>
                    <Select
                        options={themes}
                        onChange={handleChangeTheme}
                        className="select"
                        defaultValue={theme}
                        value={theme}
                        components={undefined}
                    />
                </ModalField>
                <ModalField>
                    <ModalText>{t("language")}</ModalText>
                    <Select
                        options={languageOptions}
                        onChange={handleLanguageChange}
                        className="select"
                        defaultValue={currentLanguage}
                        value={currentLanguage}
                        components={undefined}
                    />
                </ModalField>
                <ModalField>
                    <Button onClick={handleStatisticsClick}>
                        {t("statistics")}
                    </Button>
                </ModalField>
            </ModalContent>
        </StyledModal>
    );
};

export { SettingsModal };
