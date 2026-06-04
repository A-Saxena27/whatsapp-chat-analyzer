import { useRef } from "react";

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function Particles({
  emojis = ["💚", "💬", "❤️", "✨", "🥰"],
  count = 18,
}: {
  emojis?: string[];
  count?: number;
}) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: rand(5, 95),
      y: rand(5, 95),
      size: rand(16, 36),
      dur: rand(6, 14),
      delay: rand(0, 6),
    })),
  ).current;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.18,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
