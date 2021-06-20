import { sizeOptions } from "../config";

const findFieldSize = (value) => {
    return sizeOptions.find((item) => item.fieldSize === value);
};

export default findFieldSize;
