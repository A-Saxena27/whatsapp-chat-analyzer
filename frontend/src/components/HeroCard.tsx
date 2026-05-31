export default function HeroCard() {
  return (
    <div
      className="
      backdrop-blur-xl
      bg-white/5
      border
      border-white/10
      rounded-3xl
      p-10
      max-w-md
      w-full
      text-center
      shadow-2xl
    "
    >
      <h1 className="text-6xl font-black">WHATSAPP</h1>

      <h1 className="text-6xl font-black text-green-400">WRAPPED</h1>

      <p className="text-gray-400 mt-4">
        Turn your chats into unforgettable insights.
      </p>

      <div className="flex flex-col gap-4 mt-8">
        <button
          className="
          bg-green-500
          hover:bg-green-400
          text-black
          font-bold
          py-3
          rounded-xl
          transition
        "
        >
          Upload Chat
        </button>

        <button
          className="
          bg-white/10
          border
          border-white/10
          py-3
          rounded-xl
        "
        >
          Try Demo Chat
        </button>
      </div>
    </div>
  );
}
