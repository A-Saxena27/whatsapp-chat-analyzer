import Glass from "../common/GlassCard";

type FlagsData = {
  greenFlags: string[];
  redFlags: string[];
};

export default function RedGreenFlag({ data }: { data: FlagsData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Flags Report
      </div>
      <Glass
        className="w-full p-4"
        style={{
          background: "rgba(37,211,102,0.08)",
          borderColor: "rgba(37,211,102,0.2)",
        }}
      >
        <div className="text-green-400 font-bold mb-3 flex items-center gap-2">
          🟢 Green Flags
        </div>
        <div className="flex flex-col gap-2">
          {data.greenFlags.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-green-400/10 rounded-xl px-3 py-2 text-sm text-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </Glass>
      <Glass
        className="w-full p-4"
        style={{
          background: "rgba(255,45,117,0.08)",
          borderColor: "rgba(255,45,117,0.2)",
        }}
      >
        <div className="text-pink-400 font-bold mb-3 flex items-center gap-2">
          🚩 Red Flags
        </div>
        <div className="flex flex-col gap-2">
          {data.redFlags.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-pink-400/10 rounded-xl px-3 py-2 text-sm text-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </Glass>
    </div>
  );
}
