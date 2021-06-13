import React from "react";
import Cell from "../components/Cell";
import BombCount from "./../components/BombCount";
import Timer from "./../components/Timer";
import SettingsModal from "./../modal/SettingsModal";
import WinModal from "./../modal/WinModal";
import LoseModal from "./../modal/LoseModal";
import { useAppContext } from "../helpers/functions/context";

const BoardComponent = ({
    boardState,
    startNewGame,
    updateCells,
    contextMenu,
    onChangeFieldSize,
    winModalVisible,
    loseModalVisible,
    settingsModalVisible,
    time,
    setTime,
    setSettingsModalVisible,
    setWinModalVisible,
    setLoseModalVisible,
    onChangeTheme,
}) => {
    const { imageTheme } = useAppContext();

    return (
        <div className={`boardWrap`}>
            <div className="row row-1">
                <BombCount bombCount={boardState.bombCount} />
                <div className="newGame" onClick={startNewGame}>
                    {boardState?.status === "lose" ? (
                        <img src={imageTheme?.sadSmile} alt="" />
                    ) : (
                        <img src={imageTheme?.happySmile} alt="" />
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
            <WinModal
                isOpen={winModalVisible}
                onRequestClose={() => setWinModalVisible(false)}
            />
            <LoseModal
                isOpen={loseModalVisible}
                onRequestClose={() => setLoseModalVisible(false)}
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
