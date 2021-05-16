import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import happySmile from "../img/happySmile.png";
import sadSmile from "../img/sadSmile.png";
import gearIcon from "../img/gear.png";
import BombCount from "./BombCount";
import Timer from "./Timer";
import SettingsModal from "./SettingsModal";
import WinModal from "./WinModal";
import LoseModal from "./LoseModal";

const options = [
    { id: 1, value: "9", count: 9, bombs: 1, label: "9" },
    { id: 2, value: "16", count: 16, bombs: 32, label: "16" },
    { id: 3, value: "25", count: 25, bombs: 50, label: "25" },
];

const Board = () => {
    const [boardState, setBoardState] = useState({
        cell: [],
        count: 9,
        bombs: 1,
        status: "",
        counter: 0,
        bombCount: 10,
    });
    const [time, setTime] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [winModalVisible, setWinModalVisible] = useState(false);
    const [loseModalVisible, setLoseModalVisible] = useState(false);

    const onModalOpen = () => {
        setModalVisible(true);
    };
    const onModalClose = () => {
        setModalVisible(false);
    };
    const onWinModalClose = () => {
        setWinModalVisible(false);
    };
    const onLoseModalClose = () => {
        setLoseModalVisible(false);
    };

    useEffect(() => {
        setBoardState((prev) => {
            return {
                ...prev,
                cell: createCells(boardState.count, boardState.bombs),
            };
        });
    }, []);

    useEffect(() => {
        if (boardState.status === "") {
            setBoardState((prev) => {
                return {
                    ...prev,
                    status: "in-game",
                };
            });
        }
        if (boardState.status === "Вы выиграли!") {
            setWinModalVisible(true);
        }
        if (boardState.status === "Вы проиграли!") {
            setLoseModalVisible(true);
        }
        console.log(boardState);
    }, [boardState.status]);

    const onChangeFieldSize = (option) => {
        setBoardState((prev) => {
            return {
                ...prev,
                count: option.count,
                cell: createCells(option.count, option.bombs),
                counter: 0,
                status: "",
                bombs: option.bombs,
                bombCount: option.bombs,
            };
        });
    };

    const createCells = (count, bombs) => {
        let cells = [];
        let bombCount = bombs;
        for (let j = 0; j < count; j++) {
            cells[j] = [];
            for (let i = 0; i < count; i++) {
                cells[j][i] = {
                    id: i + j * count,
                    y: i,
                    x: j,
                    num: 0,
                    isChecked: false,
                    isFlag: false,
                    key: Math.random(),
                };
            }
        }

        while (bombCount !== 0) {
            bombCount = random_bomb(cells, bombCount, count);
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                if (cells[j][i].num >= 9) {
                    if (j - 1 >= 0 && i - 1 >= 0) cells[j - 1][i - 1].num++;
                    if (j - 1 >= 0) cells[j - 1][i].num++;
                    if (j - 1 >= 0 && i + 1 <= count - 1)
                        cells[j - 1][i + 1].num++;

                    if (i - 1 >= 0) cells[j][i - 1].num++;
                    if (i + 1 <= count - 1) cells[j][i + 1].num++;

                    if (j + 1 <= count - 1 && i - 1 >= 0)
                        cells[j + 1][i - 1].num++;
                    if (j + 1 <= count - 1) cells[j + 1][i].num++;
                    if (j + 1 <= count - 1 && i + 1 <= count - 1)
                        cells[j + 1][i + 1].num++;
                }
            }
        }

        return cells;
    };

    const showBoard = () => {
        let newState = boardState.cell;
        for (let i = 0; i < boardState.count; i++) {
            for (let j = 0; j < boardState.count; j++) {
                newState[j][i].isChecked = true;
            }
        }
        setBoardState((prev) => {
            return { ...prev, cell: newState };
        });
    };

    const showAllBombs = (newState) => {
        for (let i = 0; i < boardState.count; i++) {
            for (let j = 0; j < boardState.count; j++) {
                if (newState[j][i].num > 8) {
                    newState[j][i].isChecked = true;
                }
            }
        }
        return newState;
    };

    const isAllBombsFlagged = (newState) => {
        for (let i = 0; i < boardState.count; i++) {
            for (let j = 0; j < boardState.count; j++) {
                if (newState[j][i].num > 8) {
                    if (!newState[j][i].isFlag) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const isNonBombCellsChecked = (newState) => {
        for (let i = 0; i < boardState.count; i++) {
            for (let j = 0; j < boardState.count; j++) {
                if (newState[j][i].num < 9) {
                    if (!newState[j][i].isChecked) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const updateCells = (y, x) => {
        if (!boardState.cell[y][x].isChecked && !boardState.cell[y][x].isFlag) {
            let newState = boardState.cell;
            if (newState[y][x].num > 8) {
                newState[y][x].isChecked = true;
                showAllBombs(newState);
                setBoardState((prev) => {
                    return { ...prev, cell: newState, status: "Вы проиграли!" };
                });
            } else if (newState[y][x].num > 0 && newState[y][x].num < 9) {
                newState[y][x].isChecked = true;
            } else if (newState[y][x].num === 0) {
                newState[y][x].isChecked = true;
                newState = checkZero(y, x, newState, boardState.count);
            }
            setBoardState((prev) => {
                return { ...prev, cell: newState };
            });
            if (
                isNonBombCellsChecked(newState) &&
                isAllBombsFlagged(newState)
            ) {
                setBoardState((prev) => {
                    return { ...prev, status: "Вы выиграли!" };
                });
            }
        }
    };

    const contextMenu = (y, x) => {
        let newState = boardState.cell;
        if (boardState.cell[y][x].isFlag) {
            newState[y][x].isFlag = false;
            setBoardState((prev) => {
                return {
                    ...prev,
                    cell: newState,
                    counter:
                        boardState.cell[y][x].num > 8
                            ? boardState.counter - 1
                            : boardState.counter,
                };
            });
        } else {
            newState[y][x].isFlag = true;
            setBoardState((prev) => {
                return {
                    ...prev,
                    cell: newState,
                    counter:
                        boardState.cell[y][x].num > 8
                            ? boardState.counter + 1
                            : boardState.counter,
                    bombCount: boardState.bombCount - 1,
                };
            });
        }
        if (isNonBombCellsChecked(newState) && isAllBombsFlagged(newState)) {
            setBoardState((prev) => {
                return { ...prev, status: "Вы выиграли!" };
            });
        }
    };

    const checkZero = (y, x, newState, fieldSize) => {
        if (y - 1 >= 0) {
            newState = cellProcess(y - 1, x, newState, fieldSize);
        }
        if (x - 1 >= 0) {
            newState = cellProcess(y, x - 1, newState, fieldSize);
        }
        if (x + 1 <= fieldSize - 1) {
            newState = cellProcess(y, x + 1, newState, fieldSize);
        }
        if (y + 1 <= fieldSize - 1) {
            newState = cellProcess(y + 1, x, newState, fieldSize);
        }
        if (y + 1 <= fieldSize - 1 && x + 1 <= fieldSize - 1) {
            newState = cellProcess(y + 1, x + 1, newState, fieldSize);
        }
        if (y - 1 >= 0 && x - 1 >= 0) {
            newState = cellProcess(y - 1, x - 1, newState, fieldSize);
        }
        if (y - 1 >= 0 && x + 1 <= fieldSize - 1) {
            newState = cellProcess(y - 1, x + 1, newState, fieldSize);
        }
        if (y + 1 <= fieldSize - 1 && x - 1 >= 0) {
            newState = cellProcess(y + 1, x - 1, newState, fieldSize);
        }
        return newState;
    };

    const cellProcess = (y, x, newState, fieldSize) => {
        if (!boardState.cell[y][x].isChecked) {
            newState[y][x].isChecked = true;
            if (newState[y][x].num === 0) {
                newState = checkZero(y, x, newState, fieldSize);
            }
        }
        return newState;
    };

    const startNewGame = () => {
        setBoardState((prev) => {
            return {
                ...prev,
                cell: createCells(boardState.count, boardState.bombs),
                result: 0,
                counter: 0,
                status: "",
                bombCount: boardState.bombs,
            };
        });
    };

    return (
        <div className="boardWrap">
            <div className="row row-1">
                <BombCount bombCount={boardState.bombCount} />
                <div className="newGame" onClick={startNewGame}>
                    {boardState?.status === "Вы проиграли!" ? (
                        <img src={sadSmile} alt="" />
                    ) : (
                        <img src={happySmile} alt="" />
                    )}
                </div>
                <div onClick={() => onModalOpen()} className="gear">
                    <img src={gearIcon} alt="" />
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
                onRequestClose={() => onWinModalClose()}
            />
            <LoseModal
                isOpen={loseModalVisible}
                onRequestClose={() => onLoseModalClose()}
            />
            <SettingsModal
                isOpen={modalVisible}
                onRequestClose={() => onModalClose()}
                options={options}
                onChangeFieldSize={onChangeFieldSize}
            />
        </div>
    );
};

const randomInteger = (min, max) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

const random_bomb = (matrix, bombCount, fieldSize) => {
    const xCoordinate = randomInteger(0, fieldSize - 1);
    const yCoordinate = randomInteger(0, fieldSize - 1);
    if (matrix[xCoordinate][yCoordinate].num !== 9) {
        matrix[xCoordinate][yCoordinate].num = 9;
        bombCount--;
    }
    return bombCount;
};

export default Board;
