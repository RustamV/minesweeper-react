import React, { useState, useEffect } from "react";
import numberToImage from "../helpers/functions/numberToImage";
import { useAppContext } from "../helpers/functions/context";

const Timer = ({ status, setTime, time, theme }) => {
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

    const timeCountToNumber = (time) => {
        return `${time}`.split("").map((i) => numberToImage(+i, imageTheme));
    };

    return (
        <div className="time-counter">
            {timeCountToNumber(time).map((item, index) => {
                return <img src={item} key={index} alt="" />;
            })}
        </div>
    );
};

export default Timer;
