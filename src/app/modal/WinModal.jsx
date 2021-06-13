import Modal from "react-modal";
import React from "react";
import { useAppContext } from "../helpers/functions/context";

const WinModal = ({ ...props }) => {
    const { imageTheme } = useAppContext();

    return (
        <Modal
            className="win-modal modal"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            {...props}
        >
            <div className="win-modal__image">
                <img src={imageTheme?.win} alt="" />
            </div>
        </Modal>
    );
};

export default WinModal;
