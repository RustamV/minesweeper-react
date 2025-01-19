import { FC } from "react";
import { BombCounterStyled } from "./styles";
import { StyledCell } from "../Cell/styles";
import { useTheme } from "../../stores/theme";

interface Props {
    minesToDefuse: number;
}

const BombCount: FC<Props> = ({ minesToDefuse }) => {
    const { imageTheme } = useTheme();

    return (
        <BombCounterStyled>
            <StyledCell other={true} checked={true}>
                <img src={imageTheme.mine} alt="" />
            </StyledCell>
            {`${minesToDefuse}`.split("").map((item) => {
                return (
                    <StyledCell
                        other={true}
                        checked={true}
                        data-cell={item}
                        key={Math.random()}
                    >
                        <img src={imageTheme.empty} alt="" />
                    </StyledCell>
                );
            })}
        </BombCounterStyled>
    );
};

export { BombCount };
