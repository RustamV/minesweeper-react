import React from "react";
import numberToImage from "../helpers/functions/numberToImage";

const bombCountToNumber = (bombCount) => {
    return `${bombCount}`.split("").map((i) => numberToImage(+i));
};

const BombCount = ({ bombCount }) => {
    return (
        <div className="bomb-counter">
            {bombCountToNumber(bombCount).map((item, index) => {
                return <img src={item} key={index} alt="" />;
            })}
        </div>
    );
};

export default BombCount;
