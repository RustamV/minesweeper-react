import React, { Component } from 'react';
import Cell from './Cell'

export class Board extends Component {

    state = {
        createCells: [],
        count: 9,
        bombs: 10
    };

    constructor(props) {
        super(props);
        this.state = {
            cell: this.createCells(),
            count: 9,
            bombs: 10,
            status: "",
            result: 0, //0 - in game, 1 - win, 2 - lose
            counter: 0
        };
    }

    createCells = () => {
        let cells = [];
        let bombCount = this.state.bombs;
        for (let i = 0; i < this.state.count; i++) {
            cells[i] = [];
            for(let j = 0; j < this.state.count; j++) {
                cells[i][j] = { id: j+i*this.state.count, 
                                x: i, 
                                y: j, 
                                num: 0, 
                                isChecked: false,
                                isFlag: false,
                             };
            }
        }
        
        while(bombCount !== 0) {
            bombCount = random_bomb(cells, bombCount);
        }

        for(let i = 0; i < this.state.count; i++) {
            for(let j = 0; j < this.state.count; j++) {
                if(cells[i][j].num >= 9){
                    if(i - 1 >= 0 && j - 1 >= 0)cells[i-1][j-1].num++;
                    if(i - 1 >= 0)cells[i-1][j].num++;
                    if(i - 1 >= 0 && j + 1 <= 8)cells[i-1][j+1].num++;
        
                    if(j - 1 >= 0)cells[i][j-1].num++;
                    if(j + 1 <= 8)cells[i][j+1].num++;
        
                    if(i + 1 <= 8 && j - 1 >= 0)cells[i+1][j-1].num++;
                    if(i + 1 <= 8)cells[i+1][j].num++;
                    if(i + 1 <= 8 && j + 1 <= 8)cells[i+1][j+1].num++;
                }
            }
        }
        return cells;
    }

    updateCells = (x, y) => {
        if(!this.state.cell[x][y].isChecked && !this.state.cell[x][y].isFlag) {
            let newState = this.state.cell;
            if(newState[x][y].num > 8){
                newState[x][y].isChecked = true;
                this.showAllBombs(newState);
                this.setState({status: "Вы проиграли!", cell: newState});
            }
            else if (newState[x][y].num > 0 && newState[x][y].num < 9) {
                newState[x][y].isChecked = true;
            }
            else if (newState[x][y].num === 0) {
                newState[x][y].isChecked = true;
                newState = this.checkZero(x, y, newState);
            }
            this.setState({
                cell: newState
            });
            if(this.isNonBombCellsChecked(newState) && this.isAllBombsFlagged(newState)) {
                this.setState({status: "Вы выиграли!"});
            }
        }
    }

    checkZero(x, y, newState) {
        if(x - 1 >= 0){
            newState = this.cellProcess(x - 1, y, newState);
        }
        if(y - 1 >= 0){
            newState = this.cellProcess(x, y - 1, newState);
        }
        if(y + 1 <= 8){
            newState = this.cellProcess(x, y + 1, newState);
        }
        if(x + 1 <= 8){
          newState = this.cellProcess(x + 1, y, newState);
        }
        if(x + 1 <= 8 && y + 1 <= 8){
          newState = this.cellProcess(x + 1, y + 1, newState);  
        }
        if(x - 1 >= 0 && y - 1 >= 0){
          newState = this.cellProcess(x - 1, y - 1, newState); 
        }
        if(x - 1 >= 0 && y + 1 <= 8){
          newState = this.cellProcess(x - 1, y + 1, newState);  
        }
        if(x + 1 <= 8 && y - 1 >= 0){
          newState = this.cellProcess(x + 1, y - 1, newState);
        }  
        return newState;
    }
      
    cellProcess(x, y, newState) {
        if(!this.state.cell[x][y].isChecked){
            newState[x][y].isChecked = true;
            if(newState[x][y].num === 0){
                newState = this.checkZero(x, y, newState);
          } 
        }  
        return newState;
    }

    startNewGame = (event) => {
        this.setState({
            cell: this.createCells(),
            result: 0,
            counter: 0,
            status: ""
        })
    }

    refreshState = (event) => {
        this.setState({
            cell: this.updateCells()
        })
    }

    showBoard = () => {
        let newState = this.state.cell;
        for (let i = 0; i < this.state.count; i++) {
          for(let j = 0; j < this.state.count; j++) {
            newState[i][j].isChecked = true;
          }
        }
        this.setState({
            cell: newState
        });
    }

    contextMenu = (x, y) => {
        let newState = this.state.cell;
        if(this.state.cell[x][y].isFlag) {
            newState[x][y].isFlag = false;
            this.setState({
                cell: newState,
                counter: this.state.cell[x][y].num > 8 ? this.state.counter - 1 : this.state.counter
            });
        }
        else {
            newState[x][y].isFlag = true;
            this.setState({
                cell: newState,
                counter: this.state.cell[x][y].num > 8 ? this.state.counter + 1 : this.state.counter
            });
        }
        if(this.isNonBombCellsChecked(newState) && this.isAllBombsFlagged(newState)) {
            this.setState({status: "Вы выиграли!"});
        }
    }

    isNonBombCellsChecked(newState) {
        for (let i = 0; i < this.state.count; i++) {
            for(let j = 0; j < this.state.count; j++) {
                if(newState[i][j].num < 9) {
                    if(!newState[i][j].isChecked) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    isAllBombsFlagged(newState) {
        for (let i = 0; i < this.state.count; i++) {
            for(let j = 0; j < this.state.count; j++) {
                if(newState[i][j].num > 8) {
                    if(!newState[i][j].isFlag) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    showAllBombs(newState) {
        for (let i = 0; i < this.state.count; i++) {
            for(let j = 0; j < this.state.count; j++) {
                if(newState[i][j].num > 8) {
                    newState[i][j].isChecked = true;
                }
            }
        }
        return newState;
    }
    
    createContent = () => {
        let content = [];
        for (let i = 0; i < this.state.cell.length; i++) {
            for(let j = 0; j < this.state.cell.length; j++) {
                content.push(<Cell 
                                    key={ this.state.cell[i][j].id } 
                                    x={ this.state.cell[i][j].x } 
                                    y={ this.state.cell[i][j].y } 
                                    num={ this.state.cell[i][j].num } 
                                    isChecked = { this.state.cell[i][j].isChecked }
                                    updateItem = { this.updateCells }
                                    rightClick = { this.contextMenu }
                                    id={ this.state.cell[i][j].id }
                                    isFlag={ this.state.cell[i][j].isFlag }
                                />);
            }
            
        }
        return content;
    }

    render() {
        return (
            <div className="boardWrap">
                <button onClick={this.startNewGame} className="newGame"></button>
                <div className="board">
                    {this.createContent()}
                </div>
                <div className="status">
                    {this.state.status}
                </div>
            </div>
        );
    }
    
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }
  
  function random_bomb(matrix, bombCount){
    let FI = randomInteger(0,8);
    let SI = randomInteger(0,8);
    if(matrix[FI][SI] === 9){
      bombCount = random_bomb(matrix, bombCount);
    }
    else{
        matrix[FI][SI].num = 9;
        bombCount--;
    }
    return bombCount;
  };


export default Board;
