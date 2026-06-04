type Word = { word: string; size: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function WordCloud({ words }: { words: Word[] }) {
  const sizes = ["text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl"];
  const colors = ["#25D366", "#FF2D75", "#B84CFF", "#FFD700", "#00CFFF"];
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center py-4 px-2">
      {words.map((w, i) => (
        <span
          key={w.word}
          className={`${sizes[clamp(w.size - 1, 0, 4)]} font-black leading-tight cursor-default select-none animate-pulse-slow`}
          style={{
            color: colors[i % colors.length],
            textShadow: `0 0 20px ${colors[i % colors.length]}60`,
            animationDelay: `${i * 0.3}s`,
            transform: `rotate(${rand(-8, 8)}deg)`,
            display: "inline-block",
          }}
        >
          {w.word}
        </span>
      ))}
    </div>
  );
}
