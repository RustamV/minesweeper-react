import { useState, useEffect, FC } from "react";
import { StyledCell } from "./styles";
import { useTheme } from "../../stores/theme";
import { TCellType } from "../../helpers/hooks/useBoard";

type TProps = {
    rightClick: (x: number, y: number) => void;
    updateItem: (x: number, y: number) => void;
} & TCellType;

const Cell: FC<TProps> = ({
    rightClick,
    num,
    x,
    y,
    isChecked,
    isFlag,
    updateItem,
}) => {
    const [cell, setCell] = useState<string | undefined>();
    const { imageTheme } = useTheme();

    useEffect(() => {
        if (isChecked) {
            if (num > 8) setCell(imageTheme.mine);
            else setCell(imageTheme.empty);
        } else if (isFlag) setCell(imageTheme.flag);
        else setCell(imageTheme.cell);
    }, [isChecked, isFlag, imageTheme, num]);

    const contextMenu = (e) => {
        e.preventDefault();
        rightClick(x, y);
    };

    return (
        <StyledCell
            checked={isChecked}
            onClick={() => updateItem(x, y)}
            onContextMenu={contextMenu}
            data-cell={isChecked && num < 9 ? num : ""}
        >
            <img src={cell} alt="" />
        </StyledCell>
    );
};

export { Cell };
