import styled, { css } from "styled-components";

const BoardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
    border: 3px solid var(--secondary);
    border-radius: 8px;
`;

const FirstRow = styled.div`
    display: grid;
    width: 100%;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
`;

const SecondRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

type TBoardGrid = {
    fieldSize: number;
    cellSize: string;
};

const BoardGrid = styled.div<TBoardGrid>`
    display: grid;
    position: relative;
    border: 3px solid var(--primary);
    font-family: "UpheavalPro";

    ${({ fieldSize, cellSize }) => css`
        grid-template-columns: repeat(${fieldSize}, ${cellSize});
        grid-template-rows: repeat(${fieldSize}, ${cellSize});
    `}
`;

const NewGame = styled.div`
    cursor: pointer;
    justify-self: center;
`;

const TimerText = styled.div`
    font-size: 22px;
    color: var(--primary);
`;

const RightWrapper = styled.div`
    display: flex;
    justify-content: end;
`;

const Gear = styled.div`
    justify-self: end;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export {
    BoardWrapper,
    FirstRow,
    SecondRow,
    BoardGrid,
    NewGame,
    Gear,
    TimerText,
    RightWrapper,
};
