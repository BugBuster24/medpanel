import { jsx as _jsx } from "react/jsx-runtime";
export const SearchBar = ({ value, onChange, placeholder, }) => (_jsx("input", { type: "text", value: value, onChange: onChange, placeholder: placeholder ?? "Search...", style: {
        width: "100%",
        padding: "10px 14px",
        fontSize: "14px",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        outline: "none",
        boxSizing: "border-box",
    } }));
