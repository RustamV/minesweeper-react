import React from "react";
import {
    Cell,
    BombCount,
    Timer,
    SettingsModal,
    EndModal,
    StatsModal,
} from "../components";
import { useAppContext } from "../helpers/functions/context";
import "./index.scss";

const BoardComponent = ({
    boardState,
    startNewGame,
    updateCells,
    contextMenu,
    onChangeFieldSize,
    endModalVisible,
    settingsModalVisible,
    time,
    setTime,
    setSettingsModalVisible,
    setEndModalVisible,
    onChangeTheme,
    setStatsModalVisible,
    statsModalVisible,
}) => {
    const { imageTheme } = useAppContext();

    return (
        <div className="boardWrap">
            <div className="row-1">
                <BombCount minesToDefuse={boardState.minesToDefuse} />
                <div className="newGame" onClick={startNewGame}>
                    <img
                        src={
                            boardState?.gameResult === "lose"
                                ? imageTheme?.sadFace
                                : imageTheme?.happyFace
                        }
                        alt=""
                    />
                </div>
                <div
                    onClick={() => setSettingsModalVisible(true)}
                    className="gear"
                >
                    <img src={imageTheme?.gear} alt="" />
                </div>
            </div>
            <div className="row-2">
                <span className="timer text">Timer:</span>
                <Timer
                    gameStatus={boardState.gameStatus}
                    setTime={setTime}
                    time={time}
                />
            </div>
            <div
                className="board"
                style={{
                    gridTemplateColumns: `repeat(${boardState.fieldSize}, ${boardState.cellSize})`,
                    gridTemplateRows: `repeat(${boardState.fieldSize}, ${boardState.cellSize})`,
                }}
            >
                {[].concat(...boardState?.cells).map((item) => {
                    return (
                        <Cell
                            key={item.key}
                            y={item.y}
                            x={item.x}
                            num={item.num}
                            isChecked={item.isChecked}
                            updateItem={updateCells}
                            rightClick={contextMenu}
                            id={item.id}
                            isFlag={item.isFlag}
                        />
                    );
                })}
            </div>
            <EndModal
                status={boardState.gameResult}
                isOpen={endModalVisible}
                onRequestClose={() => setEndModalVisible(false)}
            />
            <SettingsModal
                isOpen={settingsModalVisible}
                onRequestClose={() => setSettingsModalVisible(false)}
                onChangeFieldSize={onChangeFieldSize}
                onChangeTheme={onChangeTheme}
                setStatsModalVisible={setStatsModalVisible}
            />
            <StatsModal
                isOpen={statsModalVisible}
                onRequestClose={() => setStatsModalVisible(false)}
                setSettingsModalVisible={setSettingsModalVisible}
            />
        </div>
    );
};

export default BoardComponent;
