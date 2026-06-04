export default function RadarChart({
  data,
}: {
  data: Array<{ A: number; subject: string }>;
}) {
  const cx = 110,
    cy = 110,
    r = 80;
  const n = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, radius: number) => ({
    x: cx + radius * Math.cos(angle(i)),
    y: cy + radius * Math.sin(angle(i)),
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = data.map((d, i) => pt(i, (d.A / 100) * r));

  return (
    <svg width="220" height="220" className="mx-auto">
      {gridLevels.map((lvl) => {
        const pts = data.map((_, i) => pt(i, lvl * r));
        return (
          <polygon
            key={lvl}
            points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}
      {data.map((_, i) => {
        const p = pt(i, r);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={dataPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="rgba(37,211,102,0.2)"
        stroke="#25D366"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 8px #25D36680)" }}
      />
      {data.map((d, i) => {
        const p = pt(i, r + 18);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fill="rgba(255,255,255,0.7)"
            fontFamily="monospace"
          >
            {d.subject}
          </text>
        );
      })}
    </svg>
  );
}
