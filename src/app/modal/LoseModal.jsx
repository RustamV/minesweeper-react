import Modal from "react-modal";
import React from "react";
import lose from "../../img/lose.png";

const LoseModal = ({ ...props }) => {
    return (
        <Modal
            className="lose-modal modal"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            {...props}
        >
            <div className="lose-modal__image">
                <img src={lose} alt="" />
            </div>
        </Modal>
    );
};

export default LoseModal;
