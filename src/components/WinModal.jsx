import Modal from "react-modal";
import React from "react";
import win from "../img/win.png";

const WinModal = ({ ...props }) => {
    return (
        <Modal
            className="win-modal modal"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            {...props}
        >
            <div className="win-modal__image">
                <img src={win} alt="" />
            </div>
        </Modal>
    );
};

export default WinModal;
