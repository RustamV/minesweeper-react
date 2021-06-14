import React, { useState, useEffect } from "react";
import { useAppContext } from "../../helpers/functions/context";
import "./index.scss";

const Timer = ({ status, setTime, time }) => {
    const [date, setDate] = useState(new Date());
    const [gameStatus, setGameStatus] = useState("in-game");
    const { imageTheme } = useAppContext();

    const tick = () => {
        if (gameStatus === "in-game") {
            setTime((prev) => ++prev);
        }
        setDate(new Date());
    };

    useEffect(() => {
        const timerID = setTimeout(() => tick(), 1000);

        return () => {
            clearTimeout(timerID);
        };
    }, [date]);

    useEffect(() => {
        if (status === "" && gameStatus === "in-game") {
            setTime(0);
        }
        if (status === "lose" || status === "win") {
            setGameStatus("stopped");
        }
        if (status === "in-game" && gameStatus === "stopped") {
            setTime(0);
            setGameStatus("in-game");
        }
    }, [status]);

    return (
        <div className="time-counter">
            {`${time}`.split("").map((item, index) => {
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

export default Timer;
