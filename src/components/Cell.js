import React, { Component } from 'react';

import flag from '../img/no_flag.png';
import one from '../img/1-1.png';
import two from '../img/2-2.png';
import three from '../img/3-3.png';
import four from '../img/4.png';
import five from '../img/5.png';
import six from '../img/6.png';
import seven from '../img/7.png';
import eight from '../img/8.png';
import mine from '../img/мина.png';

export class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.isChecked,
            x: props.x,
            y: props.y,
            isBomb: false,
            isFlag: props.isFlag,
            num: props.num,
            id: props.id
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
                    num: props.num,  
                    isChecked: props.isChecked,
                    isFlag: props.isFlag
        };
    }

    contextMenu = (e) => {
        e.preventDefault();
        this.props.rightClick(this.state.x, this.state.y);
    }

    createContent = () => {
        
        if(this.state.isChecked) {
            switch(this.state.num) {
                case 1: 
                    return <img src={one} alt=""/>;
                case 2: 
                    return <img src={two} alt=""/>;
                case 3: 
                    return <img src={three} alt=""/>;
                case 4: 
                    return <img src={four} alt=""/>;
                case 5: 
                    return <img src={five} alt=""/>;
                case 6: 
                    return <img src={six} alt=""/>;
                case 7: 
                    return <img src={seven} alt=""/>;
                case 8: 
                    return <img src={eight} alt=""/>;
                case 8: 
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                    return <img src={mine} alt=""/>;
                default:
                    return null;
            }
        }
        else if(this.state.isFlag) {
            return <img src={flag} alt=""/>;
        }
        return null;
    }


    render() {
        return (
            <div 
                className={`cell ${this.state.isChecked ? "checked" : null}`}
                onClick={() => this.props.updateItem(this.state.x, this.state.y)}
                onContextMenu={this.contextMenu}
            >
                {this.createContent()}
            </div>
        );
    }
}

export default Cell;
