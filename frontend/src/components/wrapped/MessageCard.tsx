import { motion } from "framer-motion";
import CountUp from "react-countup";

type MessageCardProps = {
  messages: number;
};

export default function MessageCard({ messages }: MessageCardProps) {
  <CountUp end={messages} duration={2.5} />;
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-[#25D366]
      via-[#B84CFF]
      to-[#FF2D75]
    "
    >
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          p-12
          text-center
          shadow-2xl
        "
      >
        <p className="text-white/80 text-lg mb-4">WHATSAPP WRAPPED</p>

        <h1 className="text-white text-8xl font-bold">
          {messages.toLocaleString()}
        </h1>

        <p className="text-white text-2xl mt-6">Messages Sent</p>
      </motion.div>
    </div>
  );
}
