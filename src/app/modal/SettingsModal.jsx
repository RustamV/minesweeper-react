import Modal from "react-modal";
import React from "react";
import CloseIcon from "../../img/close.png";
import SettingsImage from "../../img/settings.png";
import FieldSizeImage from "../../img/field-size.png";
import Select from "../components/Select";

const SettingsModal = ({
    onRequestClose,
    options,
    onChangeFieldSize,
    ...props
}) => {
    return (
        <Modal
            className="modal settings-modal"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            onRequestClose={onRequestClose}
            {...props}
        >
            <div className="settings-modal__header">
                <img src={SettingsImage} alt="" />
                <div className="settings-modal__close">
                    <img src={CloseIcon} onClick={onRequestClose} alt="" />
                </div>
            </div>
            <div className="settings-modal__content">
                <div className="settings-modal__field">
                    <img src={FieldSizeImage} alt="" />
                    <Select
                        defaultValue={options[0]}
                        options={options}
                        onChange={(option) => onChangeFieldSize(option)}
                        className="select"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default SettingsModal;
