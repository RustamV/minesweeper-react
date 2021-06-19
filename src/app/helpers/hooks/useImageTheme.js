import { useEffect, useState } from "react";
import bloodTheme from "../../../img/blood";
import defaultTheme from "../../../img/default";
import skyTheme from "../../../img/sky";
import sandTheme from "../../../img/sand";
import deathTheme from "../../../img/death";

const useImageTheme = (theme) => {
    const [cellTheme, setCellTheme] = useState();

    useEffect(() => {
        switch (theme.value) {
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
            case "theme-death": {
                setCellTheme(deathTheme);
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
