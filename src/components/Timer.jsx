import React, { useState, useEffect } from "react";
import zero from "../img/zero.png";
import one from "../img/1.png";
import two from "../img/2.png";
import three from "../img/3.png";
import four from "../img/4.png";
import five from "../img/5.png";
import six from "../img/6.png";
import seven from "../img/7.png";
import eight from "../img/8.png";
import nine from "../img/9.png";
import hyphen from "../img/hyphen.png";

const Timer = ({ status, setTime, time }) => {
    const [date, setDate] = useState(new Date());
    const [gameStatus, setGameStatus] = useState("in-game");

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
        if ((status === "") & (gameStatus === "in-game")) {
            setTime(0);
        }
        if (status === "Вы проиграли!" || status === "Вы выиграли!") {
            setGameStatus("stopped");
        }
        if ((status === "in-game") & (gameStatus === "stopped")) {
            setTime(0);
            setGameStatus("in-game");
        }
    }, [status]);

    const numberToImage = (number) => {
        switch (number) {
            case 0: {
                return zero;
            }
            case 1: {
                return one;
            }
            case 2: {
                return two;
            }
            case 3: {
                return three;
            }
            case 4: {
                return four;
            }
            case 5: {
                return five;
            }
            case 6: {
                return six;
            }
            case 7: {
                return seven;
            }
            case 8: {
                return eight;
            }
            case 9: {
                return nine;
            }
            default:
                return hyphen;
        }
    };

    const timeCountToNumber = (time) => {
        return `${time}`.split("").map((i) => numberToImage(+i));
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
