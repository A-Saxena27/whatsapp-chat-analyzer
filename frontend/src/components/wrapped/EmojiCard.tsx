import Particles from "../wrapped/shared/Particles";
import Glass from "../common/GlassCard";
import Counter from "../wrapped/shared/Counter";

export default function EmojiCard({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <Particles emojis={[data.favoriteEmoji, "💫", "✨"]} count={20} />
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Emoji Personality
      </div>
      <div className="text-9xl animate-bounce-slow">{data.favoriteEmoji}</div>
      <Glass className="px-8 py-4">
        <div className="text-5xl font-black text-white mb-1">
          <Counter target={data.favoriteEmojiCount} />
        </div>
        <div className="text-white/60 text-sm">times used</div>
      </Glass>
      <div className="text-white/40 text-sm">
        Your spirit emoji is{" "}
        <span className="text-yellow-300">{data.favoriteEmoji}</span>
      </div>
    </div>
  );
}
