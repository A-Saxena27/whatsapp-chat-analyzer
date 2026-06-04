interface ProgressBarProps {
  total: number;
  current: number;
  onTick: () => void;
}

export default function ProgressBar({
  total,
  current,
  onTick,
}: ProgressBarProps) {
  return (
    <div className="flex gap-1 px-4 pt-4 z-30 relative">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden"
        >
          {i < current ? (
            <div className="h-full bg-white w-full" />
          ) : i === current ? (
            <div
              className="h-full bg-white animate-story-fill"
              onAnimationEnd={onTick}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
