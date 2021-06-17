import React, { useState, useEffect } from "react";
import { useAppContext } from "../../helpers/functions/context";
import "./index.scss";

const Timer = ({ setTime, time, gameStatus }) => {
    const [date, setDate] = useState(new Date());
    const { imageTheme } = useAppContext();

    const tick = () => {
        if (gameStatus === "started") {
            setTime((prev) => ++prev);
        }
        setDate(new Date());
    };

    useEffect(() => {
        const timerID = setTimeout(() => tick(), 1000);

        return () => {
            clearTimeout(timerID);
        };
    }, [date, gameStatus]);

    useEffect(() => {
        if (gameStatus === "started" || gameStatus === "not-started") {
            setTime(0);
        }
    }, [gameStatus]);

    return (
        <div className="time-counter">
            {`${time}`.split("").map((item, index) => {
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

export default Timer;
