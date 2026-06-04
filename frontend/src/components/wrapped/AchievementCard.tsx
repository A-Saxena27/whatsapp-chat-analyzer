import Glass from "../common/GlassCard";

type Achievement = {
  unlocked: boolean;
  icon: string;
  title: string;
  desc: string;
};

type AchievementCardProps = {
  data: {
    achievements: Achievement[];
  };
};

export default function AchievementCard({ data }: AchievementCardProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Chat Achievements
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {data.achievements.map((a, i) => (
          <Glass
            key={i}
            className="p-4 flex flex-col items-center gap-2 relative overflow-hidden"
            style={
              a.unlocked
                ? {
                    background: "rgba(37,211,102,0.1)",
                    borderColor: "rgba(37,211,102,0.3)",
                  }
                : { opacity: 0.4 }
            }
          >
            {a.unlocked && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(37,211,102,0.2), transparent 70%)",
                }}
              />
            )}
            <div className="text-3xl">{a.icon}</div>
            <div className="font-bold text-sm text-white">{a.title}</div>
            <div className="text-[10px] text-white/50">{a.desc}</div>
            {a.unlocked ? (
              <div className="text-[9px] text-green-400 font-mono uppercase tracking-wider">
                ✓ Unlocked
              </div>
            ) : (
              <div className="text-[9px] text-white/30 font-mono uppercase tracking-wider">
                🔒 Locked
              </div>
            )}
          </Glass>
        ))}
      </div>
    </div>
  );
}
