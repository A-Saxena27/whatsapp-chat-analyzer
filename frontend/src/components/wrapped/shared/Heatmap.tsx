function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Heatmap() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const peak = [22, 23, 0, 1];
  const vals = hours.map((h) =>
    peak.includes(h) ? rand(0.7, 1) : rand(0, 0.4),
  );
  return (
    <div className="w-full">
      <div className="flex gap-1 flex-wrap justify-center">
        {hours.map((h, i) => (
          <div
            key={h}
            className="rounded-md flex flex-col items-center"
            style={{
              width: 26,
              height: 26,
              background: `rgba(37,211,102,${vals[i].toFixed(2)})`,
              boxShadow: vals[i] > 0.6 ? "0 0 8px #25D36680" : "none",
            }}
            title={`${h}:00`}
          />
        ))}
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
