import Glass from "../common/GlassCard";
import RadarChart from "./shared/RadarChart";
export default function LoveScoreCard({
  data,
}: {
  data: { loveScore: number; radarData: any[] };
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Love & Dating Analysis
      </div>
      <RadarChart data={data.radarData} />
      <div className="grid grid-cols-2 gap-2 w-full">
        {[
          {
            label: "❤️ Love Score",
            val: `${data.loveScore}%`,
            color: "#FF2D75",
          },
          { label: "😂 Humor Match", val: "91%", color: "#FFD700" },
          { label: "💚 Green Flags", val: "88%", color: "#25D366" },
          { label: "📱 Attachment", val: "HIGH", color: "#B84CFF" },
        ].map((s) => (
          <Glass key={s.label} className="p-3 text-center">
            <div className="text-xs text-white/50">{s.label}</div>
            <div
              className="font-black text-lg"
              style={{ color: s.color, textShadow: `0 0 15px ${s.color}80` }}
            >
              {s.val}
            </div>
          </Glass>
        ))}
      </div>
      <div className="text-white/40 text-xs">
        ✨ Relationship Type:{" "}
        <span className="text-purple-400 font-bold">
          Best Friends to Lovers
        </span>
      </div>
    </div>
  );
}
