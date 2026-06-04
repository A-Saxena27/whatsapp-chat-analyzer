type DataPoint = { month: string; you: number; partner: number };

export default function BarChart({ data }: { data: DataPoint[] }) {
  const maxVal = Math.max(...data.map((d) => d.you + d.partner));
  return (
    <div className="flex items-end gap-1 h-32 w-full px-1">
      {data.map((d, i) => {
        const youH = (d.you / maxVal) * 100;
        const parH = (d.partner / maxVal) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className="w-full flex gap-0.5 items-end"
              style={{ height: "96px" }}
            >
              <div
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${youH}%`,
                  background: "linear-gradient(180deg,#25D366,#128C7E)",
                  boxShadow: "0 0 8px #25D36660",
                  transition: "height 1s cubic-bezier(.34,1.56,.64,1)",
                }}
              />
              <div
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${parH}%`,
                  background: "linear-gradient(180deg,#FF2D75,#B84CFF)",
                  boxShadow: "0 0 8px #FF2D7560",
                  transition: "height 1.2s cubic-bezier(.34,1.56,.64,1)",
                }}
              />
            </div>
            <span className="text-[8px] text-white/40 font-mono">
              {d.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}