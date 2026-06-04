import BarChart from "./shared/BarChart";
import Glass from "../common/GlassCard";

interface TimelineData {
  partner: string;
  monthlyData: any[];
  peakMonth: string;
}

export default function TimelineCard({ data }: { data: TimelineData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Messages Timeline
      </div>
      <Glass className="w-full p-4">
        <div className="flex gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ background: "#25D366" }}
            />{" "}
            You
          </span>
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ background: "#FF2D75" }}
            />{" "}
            {data.partner}
          </span>
        </div>
        <BarChart data={data.monthlyData} />
      </Glass>
      <div className="text-white/50 text-xs">
        Peak month:{" "}
        <span className="text-pink-400 font-bold">{data.peakMonth}</span> 💕
      </div>
    </div>
  );
}
