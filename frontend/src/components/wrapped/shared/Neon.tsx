import React from "react";

function Neon({
  children,
  color = "#25D366",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{ color, textShadow: `0 0 20px ${color}80, 0 0 60px ${color}40` }}
    >
      {children}
    </span>
  );
}

export default Neon;