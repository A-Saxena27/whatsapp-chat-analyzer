import Glass from "../common/GlassCard";
import Neon from "./shared/Neon";
import Heatmap from "./shared/Heatmap";

export default function NightOwlCard({
  data,
}: {
  data: { mostActiveTime: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Night Owl Analysis
      </div>
      <div className="text-5xl">🌙</div>
      <Glass className="px-8 py-4">
        <div className="text-xl font-black text-white">Most Active Time</div>
        <Neon color="#B84CFF" className="text-3xl font-black">
          {data.mostActiveTime}
        </Neon>
      </Glass>
      <Glass className="w-full p-4">
        <div className="text-xs text-white/50 mb-3 font-mono">
          Hourly Activity Heatmap
        </div>
        <Heatmap />
      </Glass>
      <div className="text-white/40 text-xs">Certified night owl duo 🦉</div>
    </div>
  );
}
