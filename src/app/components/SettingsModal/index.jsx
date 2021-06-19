import Modal from "react-modal";
import React from "react";
import { Select } from "..";
import { sizeOptions, themeOptions } from "../../helpers/config";
import { useAppContext } from "../../helpers/functions/context";
import "./index.scss";
import { useGameTheme } from "../../helpers/hooks";

const SettingsModal = ({
    onRequestClose,
    onChangeFieldSize,
    onChangeTheme,
    setSettingsModalVisible,
    setStatsModalVisible,
    ...props
}) => {
    const { imageTheme } = useAppContext();
    const [theme] = useGameTheme();

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
                <h2 className="modal__title text">Settings</h2>

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
                    <span className="modal__text text">Field size</span>
                    <Select
                        defaultValue={sizeOptions[0]}
                        options={sizeOptions}
                        onChange={(option) => onChangeFieldSize(option)}
                        className="select"
                    />
                </div>
                <div className="modal__field">
                    <span className="modal__text text">Theme</span>
                    <Select
                        options={themeOptions}
                        onChange={(option) => onChangeTheme(option)}
                        className="select"
                        defaultValue={theme}
                    />
                </div>
                <div className="modal__field">
                    <button className="button" onClick={handleStatisticsClick}>
                        Statistics
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SettingsModal;
