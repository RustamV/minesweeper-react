import { useEffect, useState } from "react";
import bloodTheme from "../../../img/blood";
import defaultTheme from "../../../img/default";
import skyTheme from "../../../img/sky";
import sandTheme from "../../../img/sand";

const useImageTheme = (theme) => {
    const [cellTheme, setCellTheme] = useState();

    useEffect(() => {
        switch (theme) {
            case "theme-blood": {
                setCellTheme(bloodTheme);
                break;
            }
            case "theme-sky": {
                setCellTheme(skyTheme);
                break;
            }
            case "theme-sand": {
                setCellTheme(sandTheme);
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
