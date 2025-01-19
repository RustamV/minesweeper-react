import { FC } from "react";
import { StyledSelect } from "./styles";
import { Props } from "react-select";

const Select: FC<Props> = ({ components, options, ...props }) => {
    return (
        <StyledSelect
            options={options}
            isSearchable={false}
            classNamePrefix="select"
            components={{
                IndicatorSeparator: () => null,
                ...components,
            }}
            {...props}
        />
    );
};

export { Select };
