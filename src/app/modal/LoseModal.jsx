import Modal from "react-modal";
import React from "react";
import { useAppContext } from "../helpers/functions/context";

const LoseModal = ({ ...props }) => {
    const { imageTheme } = useAppContext();

    return (
        <Modal
            className="lose-modal modal"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            {...props}
        >
            <div className="lose-modal__image">
                <img src={imageTheme?.lose} alt="" />
            </div>
        </Modal>
    );
};

export default LoseModal;
