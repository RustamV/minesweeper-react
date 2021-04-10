import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import win from "../img/win.png";
import lose from "../img/lose.png";
import happySmile from "../img/happySmile.png";
import sadSmile from "../img/sadSmile.png";
import Select from "./Select";

const options = [
    { id: 1, value: "9", count: 9, bombs: 10, label: "9" },
    { id: 2, value: "16", count: 16, bombs: 32, label: "16" },
    { id: 3, value: "25", count: 25, bombs: 50, label: "25" },
];

const Board = () => {
    const [boardState, setBoardState] = useState({
        cell: [],
        count: 16,
        bombs: 32,
        status: "",
        counter: 0,
    });

    useEffect(() => {
        setBoardState((prev) => {
            return {
                ...prev,
                cell: createCells(boardState.count, boardState.bombs),
            };
        });
    }, []);

    // useEffect(() => {
    //     console.log(boardState);
    // }, [boardState]);

    const onChangeFieldSize = (option) => {
        const newCells = createCells(option.count, option.bombs);
        // console.table(option);
        setBoardState((prev) => {
            return {
                ...prev,
                count: option.count,
                cell: createCells(option.count, option.bombs),
                counter: 0,
                status: "",
                bombs: option.bombs,
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

        // console.log(count);

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
            };
        });
    };

    return (
        <div className="boardWrap">
            <div className="newGame" onClick={startNewGame}>
                {boardState?.status === "Вы проиграли!" ? (
                    <img src={sadSmile} alt="" />
                ) : (
                    <img src={happySmile} alt="" />
                )}
            </div>
            <Select
                defaultValue={options[0]}
                options={options}
                onChange={onChangeFieldSize}
                className="select"
            />
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
                {boardState?.status === "Вы выиграли!" ? (
                    <div className="win">
                        <img src={win} alt="" />
                    </div>
                ) : null}
                {boardState?.status === "Вы проиграли!" ? (
                    <div className="lose">
                        <img src={lose} alt="" />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

const randomInteger = (min, max) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

const random_bomb = (matrix, bombCount, fieldSize) => {
    // console.log(fieldSize);
    const xCoordinate = randomInteger(0, fieldSize - 1);
    const yCoordinate = randomInteger(0, fieldSize - 1);
    if (matrix[xCoordinate][yCoordinate] === 9) {
        bombCount = random_bomb(matrix, bombCount);
    } else {
        matrix[xCoordinate][yCoordinate].num = 9;
        bombCount--;
    }
    return bombCount;
};

export default Board;
