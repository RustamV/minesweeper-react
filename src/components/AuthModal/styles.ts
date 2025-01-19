import styled from "styled-components";
import Modal from "react-modal";

const StyledModal = styled(Modal)`
    width: 600px;
    height: 360px;
    background-color: var(--third);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    justify-content: center;
`;

export { StyledModal, Content };
