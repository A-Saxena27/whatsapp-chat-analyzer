export default function AchievementCard() {
  const badges = [
    "🏆 Streak Master",
    "🔥 Night Owl",
    "😂 Meme Distributor",
    "❤️ Heart Collector",
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>

      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div
            key={badge}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
          >
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
