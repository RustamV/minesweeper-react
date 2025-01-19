import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { useTheme } from "./stores/theme";
import { BoardComponent } from "./components/BoardComponent";
import "./styles/index.css";
import "./fonts/index.css";

const queryClient = new QueryClient();

const App = () => {
    const { theme } = useTheme();

    useEffect(() => {
        document.body.className = "";
        document.body.classList.add(theme.value);
    }, [theme]);

    return (
        <QueryClientProvider client={queryClient}>
            <BoardComponent />
        </QueryClientProvider>
    );
};

export { App };
