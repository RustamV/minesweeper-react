import { components as ReactComponents } from "react-select";
import React from "react";

import select9 from "../img/9-select.png";
import select16 from "../img/16-select.png";
import select25 from "../img/25-select.png";

const Option = ({ children, ...props }) => {
    const getOptionImage = () => {
        switch (children) {
            case "9": {
                return select9;
            }
            case "16": {
                return select16;
            }
            case "25": {
                return select25;
            }
            default: {
                return select9;
            }
        }
    };

    const optionImage = getOptionImage();

    return (
        <ReactComponents.Option {...props}>
            <img src={optionImage} alt="" />
        </ReactComponents.Option>
    );
};

export default Option;
