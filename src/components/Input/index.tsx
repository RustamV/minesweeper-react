import { FC, InputHTMLAttributes } from "react";
import { StyledInput } from "./styles";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
    return <StyledInput {...props} />;
};

export { Input };
