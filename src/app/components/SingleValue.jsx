import { components as ReactComponents } from "react-select";
import React from "react";
import { useAppContext } from "../helpers/functions/context";

const SingleValue = ({ children, type, ...props }) => {
    const { imageTheme } = useAppContext();

    const getOptionImage = () => {
        switch (children) {
            case "16": {
                return imageTheme?.select16;
            }
            case "25": {
                return imageTheme?.select25;
            }
            default: {
                return imageTheme?.select9;
            }
        }
    };

    const optionImage = getOptionImage();

    return (
        <ReactComponents.SingleValue {...props}>
            {type === "size" ? <img src={optionImage} alt="" /> : children}
        </ReactComponents.SingleValue>
    );
};

export default SingleValue;
