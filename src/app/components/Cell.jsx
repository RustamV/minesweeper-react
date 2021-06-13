import React from "react";
import { useAppContext } from "../helpers/functions/context";

export const Cell = ({
    rightClick,
    num,
    x,
    y,
    isChecked,
    isFlag,
    updateItem,
}) => {
    const { imageTheme } = useAppContext();

    const contextMenu = (e) => {
        e.preventDefault();
        rightClick(x, y);
    };

    const createContent = () => {
        if (isChecked) {
            switch (num) {
                case 1:
                    return <img src={imageTheme?.one} alt="" />;
                case 2:
                    return <img src={imageTheme?.two} alt="" />;
                case 3:
                    return <img src={imageTheme?.three} alt="" />;
                case 4:
                    return <img src={imageTheme?.four} alt="" />;
                case 5:
                    return <img src={imageTheme?.five} alt="" />;
                case 6:
                    return <img src={imageTheme?.six} alt="" />;
                case 7:
                    return <img src={imageTheme?.seven} alt="" />;
                case 8:
                    return <img src={imageTheme?.eight} alt="" />;
                case 0:
                    return <img src={imageTheme?.empty} alt="" />;
                default:
                    return <img src={imageTheme?.mine} alt="" />;
            }
        } else if (isFlag) {
            return <img src={imageTheme?.flag} alt="" />;
        }
        return <img src={imageTheme?.cell} alt="" />;
    };

    return (
        <div
            className={`cell ${isChecked && "checked"}`}
            onClick={() => updateItem(x, y)}
            onContextMenu={contextMenu}
        >
            {createContent()}
        </div>
    );
};

export default Cell;
