type Props = {
  messages: number;
  words: number;
  loveScore: number;
};

export default function FinalWrappedCard({
  messages,
  words,
  loveScore,
}: Props) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center">
      <h1 className="text-5xl font-bold mb-8">🎉 WhatsApp Wrapped</h1>

      <div className="space-y-3">
        <p>{messages.toLocaleString()} Messages</p>
        <p>{words.toLocaleString()} Words</p>
        <p>❤️ Love Score: {loveScore}%</p>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <button className="bg-green-500 text-black py-3 rounded-xl">
          Share Wrapped
        </button>

        <button className="bg-purple-500 py-3 rounded-xl">
          Download Report
        </button>

        <button className="bg-pink-500 py-3 rounded-xl">
          Analyze Another Chat
        </button>
      </div>
    </div>
  );
}
