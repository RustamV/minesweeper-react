import { useState, useEffect, SetStateAction, Dispatch, FC } from "react";
import { StyledCell } from "../Cell/styles";
import { TimeCounterStyled } from "./styles";
import { useTheme } from "../../stores/theme";

interface Props {
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
    gameStatus: string;
}

const Timer: FC<Props> = ({ setTime, time, gameStatus }) => {
    const [date, setDate] = useState(new Date());
    const { imageTheme } = useTheme();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, gameStatus]);

    useEffect(() => {
        if (gameStatus === "started" || gameStatus === "not-started") {
            setTime(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStatus]);

    return (
        <TimeCounterStyled>
            {`${time}`.split("").map((item) => {
                return (
                    <StyledCell
                        other
                        checked
                        data-cell={item}
                        key={Math.random()}
                    >
                        <img src={imageTheme.empty} alt="" />
                    </StyledCell>
                );
            })}
        </TimeCounterStyled>
    );
};

export { Timer };
