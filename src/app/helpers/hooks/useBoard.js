import { useEffect, useState } from "react";

const useBoard = () => {
    const [boardState, setBoardState] = useState({
        cell: [],
        count: 9,
        bombs: 10,
        status: "",
        counter: 0,
        bombCount: 10,
    });

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
        boardState.status === "win" && showBoard();
        boardState.status === "lose" && showBoard();
    }, [boardState.status]);

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
                    return { ...prev, cell: newState, status: "lose" };
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
                    return { ...prev, status: "win" };
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
                return { ...prev, status: "win" };
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

    return {
        boardState,
        startNewGame,
        updateCells,
        contextMenu,
        onChangeFieldSize,
    };
};

export default useBoard;
