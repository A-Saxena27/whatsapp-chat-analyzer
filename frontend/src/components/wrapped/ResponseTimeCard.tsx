import Glass from "../common/GlassCard";

type ResponseData = {
  youResponseTime: string | number;
  partner: string;
  partnerResponseTime: string | number;
};

export default function Card5({ data }: { data: ResponseData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Response Time Battle
      </div>
      <div className="flex gap-6 w-full">
        <Glass className="flex-1 p-5 flex flex-col items-center gap-2">
          <div className="text-2xl">⚡</div>
          <div className="text-xs text-white/50 font-mono uppercase">You</div>
          <div className="text-2xl font-black text-green-400">
            {data.youResponseTime}
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-green-400 w-4/5"
              style={{ boxShadow: "0 0 10px #25D366" }}
            />
          </div>
          <div className="text-green-400 text-xs font-bold">⚡ WINNER</div>
        </Glass>
        <Glass className="flex-1 p-5 flex flex-col items-center gap-2">
          <div className="text-2xl">🐢</div>
          <div className="text-xs text-white/50 font-mono uppercase">
            {data.partner}
          </div>
          <div className="text-2xl font-black text-pink-400">
            {data.partnerResponseTime}
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-pink-400 w-2/5"
              style={{ boxShadow: "0 0 10px #FF2D75" }}
            />
          </div>
          <div className="text-pink-400 text-xs font-bold">🐢 slow</div>
        </Glass>
      </div>
      <div className="text-white/40 text-xs">You reply 2.5× faster 🏃‍♂️</div>
    </div>
  );
}
