import WordCloud from "./shared/WordCloud";
import Glass from "../common/GlassCard";
import Neon from "./shared/Neon";

function Card3({ data }: { data: any }) {
  const topWords = data?.topWords || [];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Most Used Words
      </div>

      <Glass className="w-full p-5">
        {topWords.length > 0 ? (
          <WordCloud words={topWords} />
        ) : (
          <div className="text-white/50 py-10">
            No word data available
          </div>
        )}
      </Glass>

      <div className="text-white/40 text-xs">
        {topWords.length > 0 ? (
          <>
            Your top word?{" "}
            <Neon color="#25D366" className="font-bold text-sm">
              "{topWords[0].word}"
            </Neon>{" "}
            — used {topWords[0].count} times 💚
          </>
        ) : (
          "No words found in chat"
        )}
      </div>
    </div>
  );
}

export default Card3;