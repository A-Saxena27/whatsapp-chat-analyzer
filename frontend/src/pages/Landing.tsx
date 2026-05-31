import AnimatedBackground from "../components/AnimatedBackground";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12"
      >
        <h1 className="text-6xl font-black text-white">
          WHATSAPP
          <br />
          <span
            className="
  bg-gradient-to-r
  from-green-400
  via-purple-500
  to-pink-500
  bg-clip-text
  text-transparent
"
          >
            WRAPPED
          </span>
        </h1>

        <p className="text-zinc-400 mt-4">
          Turn your chats into unforgettable insights.
        </p>

        <div className="flex gap-4 mt-10">
          <button
            onClick={() => navigate("/upload")}
            className="
      px-8 py-4
      rounded-2xl
      bg-[#25D366]
      text-black
      font-bold
      text-lg
      shadow-[0_0_30px_rgba(37,211,102,0.5)]
      hover:scale-105
      transition-all
      duration-300
    "
          >
            Upload Chat
          </button>

          <button
            className="
      px-8 py-4
      rounded-2xl
      border
      border-white/20
      bg-white/5
      backdrop-blur-md
      text-white
      text-lg
      hover:bg-white/10
      transition-all
      duration-300
    "
          >
            Try Demo Chat
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          <div>
            <h3 className="text-2xl font-bold text-white">98%</h3>

            <p className="text-zinc-500 text-sm">AI Accuracy</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">2025</h3>

            <p className="text-zinc-500 text-sm">Wrapped Edition</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
