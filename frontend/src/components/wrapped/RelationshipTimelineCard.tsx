import Glass from "../common/GlassCard";
import TimeLine from "./TimelineCard";

function Card8({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Relationship Timeline
      </div>
      <Glass className="w-full p-4">
        <TimeLine data={data.monthlyData} />
      </Glass>
      <Glass className="px-6 py-3">
        <span className="text-pink-400 font-bold">🌸 {data.peakMonth}</span>
        <span className="text-white/60 text-sm">
          {" "}
          was your peak. Something special happened? 👀
        </span>
      </Glass>
    </div>
  );
}

export default Card8;
