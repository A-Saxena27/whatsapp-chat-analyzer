import { useState } from "react";
import { motion } from "framer-motion";
import MessageCard from "../components/wrapped/MessageCard";
import EmojiCard from "../components/wrapped/EmojiCard";
import ResponseTimeCard from "../components/wrapped/ResponseTimeCard";
import AchievementCard from "../components/wrapped/AchievementCard";
import NightOwlCard from "../components/wrapped/NightOwlCard";
import ConversationStarterCard from "../components/wrapped/ConversationStarterCard";
import FinalWrappedCard from "../components/wrapped/FinalWrappedCard";

export default function Wrapped() {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    <MessageCard messages={48291} />,
    <EmojiCard emoji="🥰" count={198} />,
    <NightOwlCard activeTime="11 PM - 1 AM" />,
    <ResponseTimeCard you="2m 13s" partner="5m 42s" />,
    <ConversationStarterCard you={62} partner={38} />,
    <AchievementCard />,
    <FinalWrappedCard messages={48291} words={392104} loveScore={87} />,
  ];

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  return (
    <div
      onClick={nextCard}
      className="relative h-screen bg-black text-white flex flex-col items-center justify-center cursor-pointer"
    >
      <div className="absolute top-0 left-0 w-full flex gap-2 p-4">
        {cards.map((_, index) => (
          <div key={index} className="flex-1 h-1 rounded-full bg-white/20">
            <div
              className={`h-full rounded-full ${
                index <= currentCard ? "bg-white" : "bg-transparent"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="text-gray-400 mb-4">Tap to continue</div>

      <motion.div
        key={currentCard}
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {cards[currentCard]}
      </motion.div>
    </div>
  );
}
