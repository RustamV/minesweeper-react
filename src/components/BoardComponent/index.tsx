import {
    Cell,
    BombCount,
    Timer,
    SettingsModal,
    EndModal,
    StatisticsModal,
} from "..";
import { useTranslation } from "react-i18next";
import {
    BoardGrid,
    BoardWrapper,
    FirstRow,
    Gear,
    NewGame,
    RightWrapper,
    SecondRow,
    TimerText,
} from "./styles";
import { AuthModal } from "../AuthModal";
import { useTheme } from "../../stores/theme";
import {
    useAuthModal,
    useEndModal,
    useSettingsModal,
} from "../../stores/modal";
import { useEffect, useState } from "react";
import { Result, useStatistics } from "../../stores/statistics";
import { useBoard } from "../../helpers/hooks";

const BoardComponent = () => {
    const { imageTheme } = useTheme();
    const { t } = useTranslation("app");
    const { openModal: openAuthModal } = useAuthModal();
    const { openModal: openSettingsModal } = useSettingsModal();
    const { addRecord } = useStatistics();
    const { openModal } = useEndModal();

    const [time, setTime] = useState(0);
    const { boardState, startNewGame, updateCells, contextMenu } = useBoard();

    useEffect(() => {
        const { gameResult } = boardState;
        if (gameResult === Result.WIN || gameResult === Result.LOSE) {
            openModal();
            addRecord({
                date: new Date(Date.now()).toLocaleDateString(),
                time,
                result: gameResult,
            });
        }
    }, [addRecord, boardState, boardState.gameResult, openModal, time]);

    return (
        <BoardWrapper>
            <FirstRow>
                <BombCount minesToDefuse={boardState.minesToDefuse} />
                <NewGame onClick={startNewGame}>
                    <img
                        src={
                            boardState?.gameResult === Result.LOSE
                                ? imageTheme.sadFace
                                : imageTheme.happyFace
                        }
                        alt=""
                    />
                </NewGame>
                <RightWrapper>
                    <Gear onClick={openAuthModal}>
                        <img src={imageTheme.gear} alt="" />
                    </Gear>
                    <Gear onClick={openSettingsModal}>
                        <img src={imageTheme.gear} alt="" />
                    </Gear>
                </RightWrapper>
            </FirstRow>
            <SecondRow>
                <TimerText>{t("timer")}</TimerText>
                <Timer
                    gameStatus={boardState.gameStatus}
                    setTime={setTime}
                    time={time}
                />
            </SecondRow>
            <BoardGrid
                fieldSize={boardState.fieldSize}
                cellSize={boardState.cellSize}
            >
                {boardState.cells.flat().map((item) => {
                    return (
                        <Cell
                            {...item}
                            updateItem={updateCells}
                            rightClick={contextMenu}
                        />
                    );
                })}
            </BoardGrid>
            <EndModal gameStatus={boardState.gameResult} />
            <SettingsModal />
            <StatisticsModal />
            <AuthModal />
        </BoardWrapper>
    );
};

export { BoardComponent };
