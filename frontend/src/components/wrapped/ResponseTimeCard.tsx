type Props = {
  you: string;
  partner: string;
};

export default function ResponseTimeCard({ you, partner }: Props) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
      <h2 className="text-3xl font-bold mb-6">⚡ Response Time Battle</h2>

      <div className="space-y-5">
        <div>
          <p>You</p>
          <div className="h-4 bg-green-500 rounded-full w-3/4 mx-auto"></div>
          <p>{you}</p>
        </div>

        <div>
          <p>Partner</p>
          <div className="h-4 bg-pink-500 rounded-full w-1/2 mx-auto"></div>
          <p>{partner}</p>
        </div>
      </div>

      <h3 className="text-green-400 mt-6 text-xl">🏆 Faster Responder</h3>
    </div>
  );
}
