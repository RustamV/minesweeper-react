import Modal from "react-modal";
import React from "react";
import { Select } from "..";
import { sizeOptions, themeOptions } from "../../helpers/config";
import { useAppContext } from "../../helpers/functions/context";
import "./index.scss";

const SettingsModal = ({
    onRequestClose,
    onChangeFieldSize,
    onChangeTheme,
    ...props
}) => {
    const { imageTheme } = useAppContext();

    return (
        <Modal
            className="modal settings-modal"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            onRequestClose={onRequestClose}
            {...props}
        >
            <div className="settings-modal__header">
                <h2 className="settings-modal__title text">Settings</h2>

                <div className="settings-modal__close">
                    <img
                        src={imageTheme?.close}
                        onClick={onRequestClose}
                        alt=""
                    />
                </div>
            </div>
            <div className="settings-modal__content">
                <div className="settings-modal__field">
                    <span className="settings-modal__text text">
                        Field size
                    </span>
                    <Select
                        defaultValue={sizeOptions[0]}
                        options={sizeOptions}
                        onChange={(option) => onChangeFieldSize(option)}
                        className="select"
                        type={"size"}
                    />
                </div>
                <div className="settings-modal__field">
                    <span className="settings-modal__text text">Theme</span>
                    <Select
                        defaultValue={themeOptions[0]}
                        options={themeOptions}
                        onChange={(option) => onChangeTheme(option)}
                        className="select"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default SettingsModal;
