import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder ?? "Search..."}
    style={{
      width: "100%",
      padding: "10px 14px",
      fontSize: "14px",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      outline: "none",
      boxSizing: "border-box",
    }}
  />
);
