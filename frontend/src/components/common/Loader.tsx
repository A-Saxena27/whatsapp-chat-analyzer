import { useEffect, useState } from "react";

interface LoaderProps {
  onDone: () => void;
}

interface ParticlesProps {
  emojis: string[];
  count: number;
}

function Particles({ emojis, count }: ParticlesProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="absolute text-xl"
          style={{
            left: `${(index / count) * 100}%`,
            top: `${(index % 5) * 18}%`,
            opacity: 0.25,
          }}
        >
          {emojis[index % emojis.length]}
        </span>
      ))}
    </div>
  );
}

export default function Loader({ onDone }: LoaderProps) {
  const steps = [
    "Analyzing messages...",
    "Finding favorite emoji...",
    "Calculating compatibility...",
    "Detecting red flags... 🚩",
    "Building your Wrapped ✨",
  ];
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    const i = Math.floor((pct / 100) * steps.length);
    setStep(Math.min(i, steps.length - 1));
  }, [pct]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 px-8 text-center">
      <Particles emojis={["💬", "✨", "📊", "💚", "🔍"]} count={20} />
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#25D366"
            strokeWidth="8"
            strokeDasharray={`${pct * 3.14} 314`}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 10px #25D366)",
              transition: "stroke-dasharray 0.1s",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black text-white">{pct}%</span>
        </div>
      </div>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-500 ${i === step ? "opacity-100 scale-105" : i < step ? "opacity-40" : "opacity-20"}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${i < step ? "bg-green-400" : i === step ? "bg-white animate-pulse" : "bg-white/20"}`}
            />
            <span
              className={`text-sm ${i === step ? "text-white font-bold" : "text-white/50"}`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
