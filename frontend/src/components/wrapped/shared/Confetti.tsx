import { useRef } from "react";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Confetti() {
  const pieces = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: rand(0, 100),
      color: ["#25D366", "#FF2D75", "#B84CFF", "#FFD700", "#00CFFF"][i % 5],
      size: rand(6, 14),
      dur: rand(2, 5),
      delay: rand(0, 3),
    })),
  ).current;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm animate-confetti"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
