import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({
  children,
  className = "",
  style = {},
}: Props) {
  return (
    <div
      className={`rounded-3xl backdrop-blur-xl border border-white/10 ${className}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
