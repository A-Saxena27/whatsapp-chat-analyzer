export default function Donut({
  pct,
  color = "#25D366",
  label,
}: {
  pct: number;
  color?: string;
  label: string;
}) {
  const r = 40,
    cx = 50,
    cy = 50;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative flex flex-col items-center">
      <svg width="100" height="100">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="white"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {pct}%
        </text>
      </svg>
      <span className="text-xs text-white/60 mt-1">{label}</span>
    </div>
  );
}
