import React, { useState, useEffect } from "react";
import { useAppContext } from "../../helpers/functions/context";
import "./index.scss";

export const Cell = ({
    rightClick,
    num,
    x,
    y,
    isChecked,
    isFlag,
    updateItem,
}) => {
    const [cell, setCell] = useState();
    const { imageTheme } = useAppContext();

    useEffect(() => {
        if (isChecked) {
            if (num > 8) setCell(imageTheme?.mine);
            else setCell(imageTheme?.empty);
        } else if (isFlag) setCell(imageTheme?.flag);
        else setCell(imageTheme?.cell);
    }, [isChecked, isFlag, imageTheme]);

    const contextMenu = (e) => {
        e.preventDefault();
        rightClick(x, y);
    };

    return (
        <div
            className={`cell ${isChecked && "checked"}`}
            onClick={() => updateItem(x, y)}
            onContextMenu={contextMenu}
            data-cell={isChecked && num < 9 ? num : ""}
        >
            <img src={cell} alt="" />
        </div>
    );
};

export default Cell;
