import React, { useEffect, useState } from "react";
import { AppWrapper } from "./helpers/functions/context";
import BoardComponent from "./BoardComponent";
import { useBoard, useGameTheme, useStats } from "./helpers/hooks";
import { useTranslation } from "react-i18next";

const Board = () => {
    const { i18n } = useTranslation("app");
    const {
        boardState,
        startNewGame,
        updateCells,
        contextMenu,
        onChangeFieldSize,
    } = useBoard();
    const [time, setTime] = useState(0);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [statsModalVisible, setStatsModalVisible] = useState(false);
    const [endModalVisible, setEndModalVisible] = useState(false);
    const { theme, imageTheme, onChangeTheme } = useGameTheme();
    const { statistics, addRecordToStorage } = useStats();

    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem("language"));
    }, []);

    useEffect(() => {
        const { gameResult } = boardState;
        if (gameResult === "win" || gameResult === "lose") {
            setEndModalVisible(true);
            addRecordToStorage(gameResult, time);
        }
    }, [boardState.gameResult]);

    return (
        <AppWrapper
            sharedState={{
                theme,
                imageTheme,
                statistics,
                fieldSize: boardState.fieldSize,
            }}
        >
            <BoardComponent
                theme={theme}
                boardState={boardState}
                startNewGame={startNewGame}
                updateCells={updateCells}
                contextMenu={contextMenu}
                onChangeFieldSize={onChangeFieldSize}
                endModalVisible={endModalVisible}
                settingsModalVisible={settingsModalVisible}
                time={time}
                setTime={setTime}
                setSettingsModalVisible={setSettingsModalVisible}
                setEndModalVisible={setEndModalVisible}
                onChangeTheme={onChangeTheme}
                statsModalVisible={statsModalVisible}
                setStatsModalVisible={setStatsModalVisible}
            />
        </AppWrapper>
    );
};

export default Board;
