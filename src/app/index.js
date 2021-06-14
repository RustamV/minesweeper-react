import React, { useEffect, useState } from "react";
import { AppWrapper } from "./helpers/functions/context";
import useBoard from "./helpers/hooks/useBoard";
import BoardComponent from "./BoardComponent";
import useImageTheme from "./helpers/hooks/useImageTheme";

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
    const [theme, setTheme] = useState("theme-default");
    const [imageTheme] = useImageTheme(theme);

    useEffect(() => {
        document.body.classList.add("theme-default");
        (boardState.status === "win" || boardState.status === "lose") &&
            setEndModalVisible(true);
    }, [boardState.status]);

    const onChangeTheme = ({ value }) => {
        document.body.className = "";
        document.body.classList.add(value);
        setTheme(value);
    };

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
