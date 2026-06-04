import Glass from "../common/GlassCard";
import Particles from "../wrapped/shared/Particles";

type Props = {
  data: {
    mostRomanticMsg: {
      text: string;
      date: string;
    };
  };
};

export default function Card11({ data }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      <Particles emojis={["💌", "✨", "🥹", "💞"]} count={14} />
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Most Romantic Message
      </div>
      <div className="text-5xl animate-pulse-slow">💌</div>
      <Glass
        className="w-full p-6 relative"
        style={{
          background: "rgba(255,45,117,0.08)",
          borderColor: "rgba(255,45,117,0.3)",
        }}
      >
        <div className="text-6xl absolute -top-4 -left-2 opacity-20">"</div>
        <p className="text-white text-base leading-relaxed italic font-light relative z-10">
          {data.mostRomanticMsg.text}
        </p>
        <div className="text-6xl absolute -bottom-8 -right-2 opacity-20">"</div>
      </Glass>
      <div className="text-white/40 text-xs font-mono">
        📅 {data.mostRomanticMsg.date}
      </div>
    </div>
  );
}
