type HeatmapProps = {
  activity?: number[];
};

export default function Heatmap({
  activity = Array(24).fill(0),
}: HeatmapProps) {
  const max = Math.max(...activity, 1);

  return (
    <div className="w-full">
      <div className="flex gap-1 flex-wrap justify-center">
        {activity.map((count, hour) => {
          const opacity = count / max;

          return (
            <div
              key={hour}
              className="rounded-md"
              style={{
                width: 26,
                height: 26,
                background: `rgba(37,211,102,${Math.max(opacity, 0.1)})`,
                boxShadow: opacity > 0.7 ? "0 0 8px #25D36680" : "none",
              }}
              title={`${hour}:00 — ${count} messages`}
            />
          );
        })}
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-white/40">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>11 PM</span>
      </div>
    </div>
  );
}
