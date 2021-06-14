import React from "react";
import { Cell, BombCount, Timer, SettingsModal, EndModal } from "../components";
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
}) => {
    const { imageTheme } = useAppContext();

    return (
        <div className={`boardWrap`}>
            <div className="row row-1">
                <BombCount bombCount={boardState.bombCount} />
                <div className="newGame" onClick={startNewGame}>
                    {boardState?.status === "lose" ? (
                        <img src={imageTheme?.sadFace} alt="" />
                    ) : (
                        <img src={imageTheme?.happyFace} alt="" />
                    )}
                </div>
                <div
                    onClick={() => setSettingsModalVisible(true)}
                    className="gear"
                >
                    <img src={imageTheme?.gear} alt="" />
                </div>
            </div>
            <div className="row row-2">
                <Timer
                    status={boardState.status}
                    setTime={setTime}
                    time={time}
                />
            </div>
            <div
                className="board"
                style={{
                    gridTemplateColumns: `repeat(${boardState.count}, 25px)`,
                    gridTemplateRows: `repeat(${boardState.count}, 25px)`,
                }}
            >
                {[].concat(...boardState?.cell).map((item) => {
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
                status={boardState.status}
                isOpen={endModalVisible}
                onRequestClose={() => setEndModalVisible(false)}
            />
            <SettingsModal
                isOpen={settingsModalVisible}
                onRequestClose={() => setSettingsModalVisible(false)}
                onChangeFieldSize={onChangeFieldSize}
                onChangeTheme={onChangeTheme}
            />
        </div>
    );
};

export default BoardComponent;
