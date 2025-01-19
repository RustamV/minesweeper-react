import styled from "styled-components";
import { Text } from "../Text/styles";

const ModalHeader = styled.div`
    border-bottom: 1px solid var(--secondary);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalOverlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.4);
`;

const ModalTitle = styled(Text)`
    font-size: 44px;
    font-weight: 400;
`;

const ModalText = styled(Text)`
    font-size: 36px;
`;

const ModalField = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const ModalContent = styled.div`
    padding: 20px;
    flex: 1;
`;

const ModalClose = styled.div`
    cursor: pointer;
    width: 28px;
    height: 28px;

    &:hover {
        opacity: 0.8;
    }
`;

const ModalTableTitle = styled(Text)`
    margin-bottom: 8px;
    font-weight: 400;
`;

const ModalTable = styled.table`
    width: 100%;
    color: var(--secondary);

    tr {
        td,
        th {
            text-align: center;
            font-weight: 400;
            height: 12px;
        }

        td:first-child,
        th:first-child {
            text-align: left;
        }

        td:last-child,
        th:last-child {
            text-align: right;
        }
    }
`;

export {
    ModalHeader,
    ModalOverlay,
    ModalText,
    ModalTitle,
    ModalField,
    ModalContent,
    ModalClose,
    ModalTable,
    ModalTableTitle,
};
