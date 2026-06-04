type DataPoint = {
  month: string;
  you: number;
  partner: number;
};

type TimelineProps = {
  data: DataPoint[];
};

export default function Timeline({ data }: TimelineProps) {
  const max = Math.max(...data.map((d) => d.you + d.partner));
  return (
    <div className="flex flex-col gap-2 w-full max-h-64 overflow-y-auto pr-1">
      {data.map((d, i) => {
        const pct = ((d.you + d.partner) / max) * 100;
        const isPeak = d.month === "Feb";
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/50 w-7 shrink-0">
              {d.month}
            </span>
            <div className="flex-1 h-5 rounded-full bg-white/5 overflow-hidden relative">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: isPeak
                    ? "linear-gradient(90deg,#FF2D75,#B84CFF)"
                    : "linear-gradient(90deg,#25D366,#128C7E)",
                  boxShadow: isPeak
                    ? "0 0 10px #FF2D7580"
                    : "0 0 10px #25D36640",
                  transition: "width 1s ease",
                }}
              />
              {isPeak && (
                <span className="absolute right-2 top-0 text-[9px] text-white/80 h-full flex items-center">
                  ⭐ Peak
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-white/40 w-10 text-right">
              {((d.you + d.partner) / 1000).toFixed(1)}k
            </span>
          </div>
        );
      })}
    </div>
  );
}
