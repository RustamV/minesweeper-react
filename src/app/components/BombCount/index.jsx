import React from "react";
import { useAppContext } from "../../helpers/functions/context";
import "./index.scss";

const BombCount = ({ bombCount }) => {
    const { imageTheme } = useAppContext();

    return (
        <div className="bomb-counter">
            {`${bombCount}`.split("").map((item, index) => {
                return (
                    <div
                        className={`cell cell--other checked`}
                        data-cell={item}
                    >
                        <img src={imageTheme?.empty} key={index} alt="" />
                    </div>
                );
            })}
        </div>
    );
};

export default BombCount;
