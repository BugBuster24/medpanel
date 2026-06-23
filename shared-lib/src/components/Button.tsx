import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  primary: { backgroundColor: "#4F46E5", color: "#fff" },
  secondary: { backgroundColor: "#F3F4F6", color: "#111827" },
  danger: { backgroundColor: "#EF4444", color: "#fff" },
};

const sizeStyles = {
  sm: { padding: "4px 10px", fontSize: "12px" },
  md: { padding: "8px 16px", fontSize: "14px" },
  lg: { padding: "12px 24px", fontSize: "16px" },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  ...rest
}) => {
  return (
    <button
      style={{
        border: "none",
        borderRadius: "6px",
        fontWeight: 600,
        cursor: "pointer",
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
      {...rest}
    >
      {label}
    </button>
  );
};
