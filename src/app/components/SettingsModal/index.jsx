import Modal from "react-modal";
import React, { useEffect } from "react";
import { Select } from "..";
import { sizeOptions, GetThemeOptions } from "../../helpers/config";
import { useAppContext } from "../../helpers/functions/context";
import { useLanguage } from "../../helpers/hooks";
import { useTranslation } from "react-i18next";
import { findFieldSize } from "../../helpers/functions";
import "./index.scss";

const SettingsModal = ({
    onRequestClose,
    onChangeFieldSize,
    onChangeTheme,
    setSettingsModalVisible,
    setStatsModalVisible,
    ...props
}) => {
    const { theme, imageTheme, fieldSize } = useAppContext();
    const { t } = useTranslation("app");
    const themeOptions = GetThemeOptions();
    const {
        currentLanguage,
        languageOptions,
        onChangeLanguage,
    } = useLanguage();

    const handleStatisticsClick = () => {
        onRequestClose();
        setStatsModalVisible(true);
    };

    return (
        <Modal
            className="settings-modal modal"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            onRequestClose={onRequestClose}
            {...props}
        >
            <div className="modal__header">
                <h2 className="modal__title text">{t("settings")}</h2>

                <div className="modal__close">
                    <img
                        src={imageTheme?.close}
                        onClick={onRequestClose}
                        alt=""
                    />
                </div>
            </div>
            <div className="modal__content">
                <div className="modal__field">
                    <span className="modal__text text">{t("fieldSize")}</span>
                    <Select
                        defaultValue={findFieldSize(fieldSize)}
                        value={findFieldSize(fieldSize)}
                        options={sizeOptions}
                        onChange={(option) => onChangeFieldSize(option)}
                        className="select"
                    />
                </div>
                <div className="modal__field">
                    <span className="modal__text text">{t("theme")}</span>
                    <Select
                        options={themeOptions}
                        onChange={(option) => onChangeTheme(option)}
                        className="select"
                        defaultValue={theme}
                        value={theme}
                    />
                </div>
                <div className="modal__field">
                    <span className="modal__text text">{t("language")}</span>
                    <Select
                        options={languageOptions}
                        onChange={(option) => onChangeLanguage(option)}
                        className="select"
                        defaultValue={currentLanguage}
                        value={currentLanguage}
                    />
                </div>
                <div className="modal__field">
                    <button className="button" onClick={handleStatisticsClick}>
                        {t("statistics")}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SettingsModal;
