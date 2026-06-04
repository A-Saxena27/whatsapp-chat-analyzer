export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-3xl p-6">Overview</div>

        <div className="bg-white/5 rounded-3xl p-6">Timeline</div>

        <div className="bg-white/5 rounded-3xl p-6">AI Insights</div>
      </div>
    </div>
  );
}
