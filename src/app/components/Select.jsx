import React from "react";
import { default as ReactSelect } from "react-select";
import Option from "./Option";
import SingleValue from "./SingleValue";

const Select = ({
    children,
    className,
    components,
    options,
    padding,
    type,
    flat,
    placeholderClassName,
    singleValueClassName,
    optionClassName,
    dropdownIndicatorIcon,
    size = "lg",
    ...props
}) => {
    return (
        <ReactSelect
            options={options}
            isSearchable={false}
            className={className}
            classNamePrefix="select"
            components={{
                IndicatorSeparator: () => null,
                Option: (optionProps) => <Option {...optionProps} />,
                SingleValue: (singleValueProps) => (
                    <SingleValue {...singleValueProps} />
                ),
                ...components,
            }}
            {...props}
        />
    );
};

export default Select;
