type Props = {
  activeTime: string;
};

export default function NightOwlCard({ activeTime }: Props) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-10 text-center">
      <div className="text-6xl mb-4">🌙</div>

      <h2 className="text-3xl font-bold">Night Owl</h2>

      <p className="mt-4 text-xl">Most active between</p>

      <div className="text-4xl font-bold text-green-400 mt-4">{activeTime}</div>
    </div>
  );
}
