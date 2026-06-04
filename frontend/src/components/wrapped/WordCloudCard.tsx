import WordCloud from "./shared/WordCloud";
import Glass from "../common/GlassCard";
import Neon from "./shared/Neon";

function Card3({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Most Used Words
      </div>
      <Glass className="w-full p-5">
        <WordCloud words={data.topWords} />
      </Glass>
      <div className="text-white/40 text-xs">
        Your top word?{" "}
        <Neon color="#25D366" className="font-bold text-sm">
          "{data.topWords[0].word}"
        </Neon>{" "}
        — used {data.topWords[0].count} times 💚
      </div>
    </div>
  );
}

export default Card3;
