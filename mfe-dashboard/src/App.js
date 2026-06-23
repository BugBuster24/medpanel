import { jsx as _jsx } from "react/jsx-runtime";
import { Dashboard } from "./Dashboard";
const App = () => {
    return (_jsx("div", { style: {
            fontFamily: "Inter, system-ui, sans-serif",
            backgroundColor: "#F9FAFB",
            minHeight: "100vh",
        }, children: _jsx(Dashboard, {}) }));
};
export default App;
