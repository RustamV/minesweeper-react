import React from "react";
import { useAppContext } from "../../helpers/functions/context";
import "./index.scss";

const BombCount = ({ minesToDefuse }) => {
    const { imageTheme } = useAppContext();

    return (
        <div className="bomb-counter">
            <div className={`cell cell--other checked`}>
                <img src={imageTheme?.mine} alt="" />
            </div>
            {`${minesToDefuse}`.split("").map((item, index) => {
                return (
                    <div
                        className={`cell cell--other checked`}
                        data-cell={item}
                        key={Math.random()}
                    >
                        <img src={imageTheme?.empty} key={index} alt="" />
                    </div>
                );
            })}
        </div>
    );
};

export default BombCount;
