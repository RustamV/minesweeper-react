import React, { useEffect, useState } from "react";
import useBoard from "./helpers/hooks/useBoard";
import BoardComponent from "./BoardComponent";

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
    const [winModalVisible, setWinModalVisible] = useState(false);
    const [loseModalVisible, setLoseModalVisible] = useState(false);

    useEffect(() => {
        boardState.status === "win" && setWinModalVisible(true);
        boardState.status === "lose" && setLoseModalVisible(true);
    }, [boardState.status]);

    return (
        <BoardComponent
            boardState={boardState}
            startNewGame={startNewGame}
            updateCells={updateCells}
            contextMenu={contextMenu}
            onChangeFieldSize={onChangeFieldSize}
            winModalVisible={winModalVisible}
            loseModalVisible={loseModalVisible}
            settingsModalVisible={settingsModalVisible}
            time={time}
            setTime={setTime}
            setSettingsModalVisible={setSettingsModalVisible}
            setWinModalVisible={setWinModalVisible}
            setLoseModalVisible={setLoseModalVisible}
        />
    );
};

export default Board;
