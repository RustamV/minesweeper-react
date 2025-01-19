import Modal from "react-modal";
import { Content, StatusText } from "./styles";
import { useEndModal } from "../../stores/modal";
import { FC } from "react";

type Props = {
    gameStatus: string;
};

const EndModal: FC<Props> = ({ gameStatus }) => {
    const { isOpen, closeModal } = useEndModal();
    return (
        <Modal
            isOpen={isOpen}
            className="end-modal modal modal--outlined"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
            onRequestClose={closeModal}
        >
            <Content>
                <StatusText>
                    {gameStatus === "win" ? "You win!" : "You lose!"}
                </StatusText>
            </Content>
        </Modal>
    );
};

export { EndModal };
