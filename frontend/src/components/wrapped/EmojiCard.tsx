import { motion } from "framer-motion";

type EmojiCardProps = {
  emoji: string;
  count: number;
};

export default function EmojiCard({ emoji, count }: EmojiCardProps) {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-[#050505]
      via-[#151515]
      to-[#B84CFF]
    "
    >
      <motion.div
        initial={{
          y: 50,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className="
          text-center
        "
      >
        <div className="text-[10rem]">{emoji}</div>

        <h2 className="text-white text-4xl font-bold">{count} Times</h2>

        <p className="text-gray-300 text-xl mt-4">Your Favorite Emoji</p>
      </motion.div>
    </div>
  );
}
