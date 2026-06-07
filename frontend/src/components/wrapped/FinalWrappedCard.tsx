import { useState, useEffect } from "react";
import Glass from "../common/GlassCard";
import Particles from "./shared/Particles";
import Counter from "./shared/Counter";
import Confetti from "./shared/Confetti";
import { useRef } from "react";

function FinalWrappedCard({
  data,
  onFinish,
}: {
  data: any;
  onFinish: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "wrapped-report.json";
    a.click();

    URL.revokeObjectURL(url);
  };
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div ref={cardRef}>
      <div className="flex flex-col items-center justify-center h-full gap-6 px-5 text-center relative">
        {showConfetti && <Confetti />}
        <Particles emojis={["🎉", "💚", "✨", "🎊", "🏆"]} count={16} />
        <div className="text-white-100 text-sm font-mono tracking-widest uppercase">
          Your
        </div>
        <div className="font-black text-4xl text-white leading-none">
          WhatsApp
        </div>
        <div
          className="font-black text-5xl leading-none"
          style={{
            background: "linear-gradient(135deg,#25D366,#B84CFF,#FF2D75)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          WRAPPED 2026
        </div>
        <div className="grid grid-cols-3 gap-3 w-full mt-2">
          {[
            { label: "Messages", val: data.totalMessages, icon: "💬" },
            { label: "Words", val: data.totalWords, icon: "📝" },
            { label: "Media", val: data.totalMedia, icon: "📸" },
            { label: "Links", val: data.totalLinks, icon: "🔗" },
            { label: "Emoji", val: data.totalEmoji, icon: "😊" },
            {
              label: "Love Score",
              val: `${data.loveScore}%`,
              icon: "❤️",
              raw: true,
            },
          ].map((s) => (
            <Glass
              key={s.label}
              className="p-3 flex flex-col items-center gap-1"
            >
              <div className="text-xl">{s.icon}</div>
              <div className="font-black text-lg text-white">
                {s.raw ? s.val : <Counter target={s.val} duration={1200} />}
              </div>
              <div className="text-[9px] text-white/40 uppercase tracking-wider">
                {s.label}
              </div>
            </Glass>
          ))}
        </div>
        <div className="flex flex-col gap-3 w-full mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();

              alert("Share feature coming soon!");
            }}
            className="w-full py-3 rounded-2xl font-bold text-sm text-black"
            style={{
              background: "linear-gradient(135deg,#25D366,#128C7E)",
              boxShadow: "0 0 20px #25D36660",
            }}
          >
            📤 Share as Story
          </button>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-2xl font-bold text-sm text-white border border-white/20"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            📊 Download Report
          </button>
          <button
            onClick={onFinish}
            className="w-full py-3 rounded-2xl font-bold text-sm text-white/60 text-xs"
          >
            🔄 Analyze Another Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinalWrappedCard;
