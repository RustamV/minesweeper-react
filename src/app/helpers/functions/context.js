import React, { createContext, useContext } from "react";

const AppContext = createContext();

export const AppWrapper = ({ sharedState, children }) => {
    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
