import React from "react";
import numberToImage from "../helpers/functions/numberToImage";
import { useAppContext } from "../helpers/functions/context";

const BombCount = ({ bombCount }) => {
    const { imageTheme } = useAppContext();

    const bombCountToNumber = (bombCount) => {
        return `${bombCount}`
            .split("")
            .map((i) => numberToImage(+i, imageTheme));
    };

    return (
        <div className="bomb-counter">
            {bombCountToNumber(bombCount).map((item, index) => {
                return <img src={item} key={index} alt="" />;
            })}
        </div>
    );
};

export default BombCount;
