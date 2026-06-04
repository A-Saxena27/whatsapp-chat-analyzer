import Particles from "./shared/Particles";
import Counter from "./shared/Counter";
import Glass from "../common/GlassCard";
import Neon from "./shared/Neon";

export default function Card1({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      <Particles emojis={["💬", "✨", "🚀", "💚"]} />
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Total Messages
      </div>
      <div
        className="text-8xl font-black text-white leading-none"
        style={{ textShadow: "0 0 60px #25D36680" }}
      >
        <Neon color="#25D366">
          <Counter target={data.totalMessages} />
        </Neon>
      </div>
      <Glass className="px-6 py-3">
        <p className="text-white/70 text-sm">
          That's roughly{" "}
          <span className="text-green-400 font-bold">
            {Math.round(data.totalMessages / 365)} messages a day
          </span>{" "}
          🤯
        </p>
      </Glass>
      <div className="text-white/30 text-xs">between you & {data.partner}</div>
    </div>
  );
}
