import Modal from "react-modal";
import React from "react";
import Select from "../components/Select";
import sizeOptions from "../helpers/config/sizeOptions";
import themeOptions from "../helpers/config/themeOptions";
import { useAppContext } from "../helpers/functions/context";

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
                <img src={imageTheme?.settings} alt="" />
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
                    <img src={imageTheme?.fieldSize} alt="" />
                    <Select
                        defaultValue={sizeOptions[0]}
                        options={sizeOptions}
                        onChange={(option) => onChangeFieldSize(option)}
                        className="select"
                        type={"size"}
                    />
                </div>
                <div className="settings-modal__field">
                    theme
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
