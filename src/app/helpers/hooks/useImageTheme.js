import { useEffect, useState } from "react";
import redTheme from "../../../img/red";
import defaultTheme from "../../../img/default";

const useImageTheme = (theme) => {
    const [cellTheme, setCellTheme] = useState();

    useEffect(() => {
        switch (theme) {
            case "theme-red": {
                setCellTheme(redTheme);
                break;
            }
            default: {
                setCellTheme(defaultTheme);
                break;
            }
        }
    }, [theme]);

    return [cellTheme];
};

export default useImageTheme;
