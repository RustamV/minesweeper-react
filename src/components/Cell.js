import React, { useEffect, useState } from "react";

import flag from "../img/flag.png";
import cell from "../img/cell.png";
import zero from "../img/0.png";
import one from "../img/1.png";
import two from "../img/2.png";
import three from "../img/3.png";
import four from "../img/4.png";
import five from "../img/5.png";
import six from "../img/6.png";
import seven from "../img/7.png";
import eight from "../img/8.png";
import mine from "../img/mine.png";

export const Cell = (props) => {
    const [cellState, setCellState] = useState({
        isChecked: props.isChecked,
        x: props.x,
        y: props.y,
        isBomb: false,
        isFlag: props.isFlag,
        num: props.num,
        id: props.id,
    });

    useEffect(() => {
        setCellState((prev) => {
            return {
                ...prev,
                num: props.num,
                isChecked: props.isChecked,
                isFlag: props.isFlag,
            };
        });
    }, [props]);

    const contextMenu = (e) => {
        e.preventDefault();
        props.rightClick(cellState.x, cellState.y);
    };

    const createContent = () => {
        if (cellState.isChecked) {
            switch (cellState.num) {
                case 1:
                    return <img src={one} alt="" />;
                case 2:
                    return <img src={two} alt="" />;
                case 3:
                    return <img src={three} alt="" />;
                case 4:
                    return <img src={four} alt="" />;
                case 5:
                    return <img src={five} alt="" />;
                case 6:
                    return <img src={six} alt="" />;
                case 7:
                    return <img src={seven} alt="" />;
                case 8:
                    return <img src={eight} alt="" />;
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
                    return <img src={mine} alt="" />;
                default:
                    return <img src={zero} alt="" />;
            }
        } else if (cellState.isFlag) {
            return <img src={flag} alt="" />;
        }
        return <img src={cell} alt="" />;
    };

    return (
        <div
            className={`cell ${cellState.isChecked && "checked"}`}
            onClick={() => props.updateItem(cellState.x, cellState.y)}
            onContextMenu={contextMenu}
        >
            {createContent()}
        </div>
    );
};

export default Cell;
