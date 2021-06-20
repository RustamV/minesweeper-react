import { useEffect, useState } from "react";
import { sizeOptions } from "../config";
import { getRandomInteger, findFieldSize } from "../functions";

const useBoard = () => {
    const [boardState, setBoardState] = useState({
        cells: [],
        fieldSize: 0,
        cellSize: "",
        mines: 0,
        gameResult: "", // win, lose
        flagCounter: 0,
        minesToDefuse: 0,
        gameStatus: "not-started", // not-started, started, stopped
    });

    useEffect(() => {
        const currentSizeOption =
            findFieldSize(+localStorage.getItem("size")) ?? sizeOptions[0];
        const newFieldSize = currentSizeOption.fieldSize;
        const newMinesCount = currentSizeOption.mines;
        const newCellSize = currentSizeOption.cellSize;

        setBoardState((prev) => {
            return {
                ...prev,
                cells: createCells(newFieldSize, newMinesCount),
                fieldSize: newFieldSize,
                mines: newMinesCount,
                minesToDefuse: newMinesCount,
                cellSize: newCellSize,
            };
        });
    }, []);

    useEffect(() => {
        boardState.gameResult === "win" && showBoard();
        boardState.gameResult === "lose" && showBoard();
    }, [boardState.gameResult]);

    const createCells = (fieldSize, mines) => {
        let cells = [];
        let bombCount = mines;
        for (let j = 0; j < fieldSize; j++) {
            cells[j] = [];
            for (let i = 0; i < fieldSize; i++) {
                cells[j][i] = {
                    id: i + j * fieldSize,
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
            bombCount = placeMineAtBoard(cells, bombCount, fieldSize);
        }

        for (let i = 0; i < fieldSize; i++) {
            for (let j = 0; j < fieldSize; j++) {
                if (cells[j][i].num >= 9) {
                    if (j - 1 >= 0 && i - 1 >= 0) cells[j - 1][i - 1].num++;
                    if (j - 1 >= 0) cells[j - 1][i].num++;
                    if (j - 1 >= 0 && i + 1 <= fieldSize - 1)
                        cells[j - 1][i + 1].num++;

                    if (i - 1 >= 0) cells[j][i - 1].num++;
                    if (i + 1 <= fieldSize - 1) cells[j][i + 1].num++;

                    if (j + 1 <= fieldSize - 1 && i - 1 >= 0)
                        cells[j + 1][i - 1].num++;
                    if (j + 1 <= fieldSize - 1) cells[j + 1][i].num++;
                    if (j + 1 <= fieldSize - 1 && i + 1 <= fieldSize - 1)
                        cells[j + 1][i + 1].num++;
                }
            }
        }

        return cells;
    };

    const showBoard = () => {
        let newState = boardState.cells;
        for (let i = 0; i < boardState.fieldSize; i++) {
            for (let j = 0; j < boardState.fieldSize; j++) {
                newState[j][i].isChecked = true;
            }
        }
        setBoardState((prev) => {
            return { ...prev, cells: newState };
        });
    };

    const showAllMines = (newState) => {
        for (let i = 0; i < boardState.fieldSize; i++) {
            for (let j = 0; j < boardState.fieldSize; j++) {
                if (newState[j][i].num > 8) {
                    newState[j][i].isChecked = true;
                }
            }
        }
        return newState;
    };

    const isAllMinesFlagged = (newState) => {
        for (let i = 0; i < boardState.fieldSize; i++) {
            for (let j = 0; j < boardState.fieldSize; j++) {
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
        for (let i = 0; i < boardState.fieldSize; i++) {
            for (let j = 0; j < boardState.fieldSize; j++) {
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
        if (boardState.gameStatus === "not-started") {
            setBoardState((prev) => {
                return { ...prev, gameStatus: "started" };
            });
        }
        if (
            !boardState.cells[y][x].isChecked &&
            !boardState.cells[y][x].isFlag
        ) {
            let newState = boardState.cells;
            if (newState[y][x].num > 8) {
                newState[y][x].isChecked = true;
                showAllMines(newState);
                setBoardState((prev) => {
                    return {
                        ...prev,
                        cells: newState,
                        gameResult: "lose",
                        gameStatus: "stopped",
                    };
                });
            } else if (newState[y][x].num > 0 && newState[y][x].num < 9) {
                newState[y][x].isChecked = true;
            } else if (newState[y][x].num === 0) {
                newState[y][x].isChecked = true;
                newState = checkZero(y, x, newState, boardState.fieldSize);
            }
            setBoardState((prev) => {
                return { ...prev, cells: newState };
            });
            checkForWin(newState);
        }
    };

    const checkForWin = (cells) => {
        if (isNonBombCellsChecked(cells) && isAllMinesFlagged(cells)) {
            setBoardState((prev) => {
                return {
                    ...prev,
                    gameResult: "win",
                    gameStatus: "stopped",
                };
            });
        }
    };

    const contextMenu = (y, x) => {
        if (boardState.gameStatus === "not-started") {
            setBoardState((prev) => {
                return { ...prev, gameStatus: "started" };
            });
        }
        let newState = boardState.cells;
        if (boardState.cells[y][x].isFlag) {
            newState[y][x].isFlag = false;
            setBoardState((prev) => {
                return {
                    ...prev,
                    cells: newState,
                    flagCounter: boardState.flagCounter - 1,
                    minesToDefuse: boardState.minesToDefuse + 1,
                };
            });
        } else {
            newState[y][x].isFlag = true;
            setBoardState((prev) => {
                return {
                    ...prev,
                    cells: newState,
                    flagCounter: boardState.flagCounter + 1,
                    minesToDefuse: boardState.minesToDefuse - 1,
                };
            });
        }
        checkForWin(newState);
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
        if (!boardState.cells[y][x].isChecked) {
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
                cells: createCells(boardState.fieldSize, boardState.mines),
                result: 0,
                flagCounter: 0,
                gameResult: "",
                minesToDefuse: boardState.mines,
                gameStatus: "not-started",
            };
        });
    };

    const onChangeFieldSize = (option) => {
        setBoardState((prev) => {
            return {
                ...prev,
                fieldSize: option.fieldSize,
                cells: createCells(option.fieldSize, option.mines),
                flagCounter: 0,
                gameResult: "",
                mines: option.mines,
                minesToDefuse: option.mines,
                cellSize: option.cellSize,
            };
        });
        localStorage.setItem("size", option.fieldSize);
    };

    const placeMineAtBoard = (matrix, minesToDefuse, fieldSize) => {
        const xCoordinate = getRandomInteger(0, fieldSize - 1);
        const yCoordinate = getRandomInteger(0, fieldSize - 1);
        if (matrix[xCoordinate][yCoordinate].num !== 9) {
            matrix[xCoordinate][yCoordinate].num = 9;
            minesToDefuse--;
        }
        return minesToDefuse;
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
