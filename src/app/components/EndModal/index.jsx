import Modal from "react-modal";
import React from "react";
import "./index.scss";

const EndModal = ({ status, ...props }) => {
    return (
        <Modal
            className="end-modal modal modal--outlined"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            {...props}
        >
            <div className="end-modal__content">
                <span className=" end-modal__text text">
                    {status === "win" ? "You win!" : "You lose!"}
                </span>
            </div>
        </Modal>
    );
};

export default EndModal;
