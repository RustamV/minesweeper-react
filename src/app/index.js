import React, { useEffect, useState } from "react";
import { AppWrapper } from "./helpers/functions/context";
import BoardComponent from "./BoardComponent";
import { useBoard, useGameTheme } from "./helpers/hooks";

const Board = () => {
    const {
        boardState,
        startNewGame,
        updateCells,
        contextMenu,
        onChangeFieldSize,
    } = useBoard();
    const [time, setTime] = useState(0);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [endModalVisible, setEndModalVisible] = useState(false);
    const [theme, imageTheme, onChangeTheme] = useGameTheme();

    useEffect(() => {
        (boardState.gameResult === "win" || boardState.gameResult === "lose") &&
            setEndModalVisible(true);
    }, [boardState.gameResult]);

    return (
        <AppWrapper
            sharedState={{
                imageTheme,
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
            />
        </AppWrapper>
    );
};

export default Board;
