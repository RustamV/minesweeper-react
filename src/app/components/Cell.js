import React from "react";

import flag from "../../img/flag.png";
import cell from "../../img/cell.png";
import zero from "../../img/0.png";
import one from "../../img/1.png";
import two from "../../img/2.png";
import three from "../../img/3.png";
import four from "../../img/4.png";
import five from "../../img/5.png";
import six from "../../img/6.png";
import seven from "../../img/7.png";
import eight from "../../img/8.png";
import mine from "../../img/mine.png";

export const Cell = (props) => {
    const contextMenu = (e) => {
        e.preventDefault();
        props.rightClick(props.x, props.y);
    };

    const createContent = () => {
        if (props.isChecked) {
            switch (props.num) {
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
                case 0:
                    return <img src={zero} alt="" />;
                default:
                    return <img src={mine} alt="" />;
            }
        } else if (props.isFlag) {
            return <img src={flag} alt="" />;
        }
        return <img src={cell} alt="" />;
    };

    return (
        <div
            className={`cell ${props.isChecked && "checked"}`}
            onClick={() => props.updateItem(props.x, props.y)}
            onContextMenu={contextMenu}
        >
            {createContent()}
        </div>
    );
};

export default Cell;
