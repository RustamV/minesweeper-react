import React from "react";
import { default as ReactSelect } from "react-select";
import "./index.scss";

const Select = ({ className, components, options, ...props }) => {
    return (
        <ReactSelect
            options={options}
            isSearchable={false}
            className={className}
            classNamePrefix="select"
            components={{
                IndicatorSeparator: () => null,
                ...components,
            }}
            {...props}
        />
    );
};

export default Select;
