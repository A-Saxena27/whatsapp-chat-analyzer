import { useState, useCallback, type ComponentType } from "react";
import MessageCard from "../components/wrapped/MessageCard";
import TimelineCard from "../components/wrapped/TimelineCard";
import WordCloudCard from "../components/wrapped/WordCloudCard";
import EmojiCard from "../components/wrapped/EmojiCard";
import ResponseTimeCard from "../components/wrapped/ResponseTimeCard";
import AchievementCard from "../components/wrapped/AchievementCard";
import NightOwlCard from "../components/wrapped/NightOwlCard";
import ConversationStarterCard from "../components/wrapped/ConversationStarterCard";
import FinalWrappedCard from "../components/wrapped/FinalWrappedCard";
import RomanticMessageCard from "../components/wrapped/RomanticMessageCard";
import ProgressBar from "../components/common/ProgressBar";

const cards: ComponentType<any>[] = [
  MessageCard,
  TimelineCard,
  WordCloudCard,
  EmojiCard,
  ResponseTimeCard,
  NightOwlCard,
  ConversationStarterCard,
  RomanticMessageCard,
  AchievementCard,
  FinalWrappedCard,
];
type WrappedProps = {
  data: any;
  onFinish: () => void;
};

export default function Wrapped({ data, onFinish }: WrappedProps) {
  const [current, setCurrent] = useState(0);
  const total = cards.length;

  const next = useCallback(() => {
    if (current < total - 1) setCurrent((c) => c + 1);
    else onFinish();
  }, [current, total, onFinish]);

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const bgGradients = [
    "from-green-950 via-black to-black",
    "from-black via-indigo-950 to-black",
    "from-purple-950 via-black to-black",
    "from-yellow-950 via-black to-black",
    "from-green-950 via-black to-pink-950",
    "from-blue-950 via-black to-purple-950",
    "from-green-950 via-black to-black",
    "from-pink-950 via-black to-black",
    "from-purple-950 via-black to-black",
    "from-green-950 via-black to-pink-950",
    "from-pink-950 via-black to-black",
    "from-yellow-950 via-black to-black",
  ];

  const CardComponent = cards[current];

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br ${bgGradients[current]} flex flex-col`}
      style={{ fontFamily: "'Syne', 'Space Grotesk', sans-serif" }}
      onClick={(e) => {
        const w = window.innerWidth;
        if (e.clientX < w / 3) prev();
        else next();
      }}
    >
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#25D366" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl"
          style={{ background: "#FF2D75" }}
        />
      </div>

      <ProgressBar total={total} current={current} onTick={next} />

      {/* header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{ background: "#25D366" }}
          >
            💬
          </div>
          <span className="text-white text-sm font-bold">WhatsApp Wrapped</span>
        </div>
        <div className="text-white/40 text-xs font-mono">
          {current + 1}/{total}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <CardComponent data={data} onFinish={onFinish} />
      </div>

      {/* tap hints */}
      <div className="flex justify-between px-6 pb-4 z-10 pointer-events-none">
        <div className="text-white/20 text-xs">← tap left</div>
        <div className="text-white/20 text-xs">tap right →</div>
      </div>
    </div>
  );
}
