import Particles from "../components/wrapped/shared/Particles";
import Neon from "../components/wrapped/shared/Neon";
import Glass from "../components/common/GlassCard";
interface LandingProps {
  onUpload: () => void;
  onDemo: () => void;
}

export default function Landing({ onUpload, onDemo }: LandingProps) {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-15 animate-blob1"
          style={{
            background: "radial-gradient(#25D366, transparent)",
            top: "-20%",
            left: "-20%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-10 animate-blob2"
          style={{
            background: "radial-gradient(#FF2D75, transparent)",
            bottom: "-20%",
            right: "-20%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-8 animate-blob3"
          style={{
            background: "radial-gradient(#B84CFF, transparent)",
            top: "30%",
            right: "10%",
          }}
        />
      </div>
      <Particles
        emojis={["💬", "❤️", "😂", "🥰", "✨", "💚", "🔥", "👀", "😍", "💯"]}
        count={22}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{
              background: "linear-gradient(135deg,#25D366,#128C7E)",
              boxShadow: "0 0 30px #25D36680",
            }}
          >
            💬
          </div>
          <div className="text-left">
            <div className="text-xs text-white/40 font-mono tracking-widest uppercase">
              whatsapp
            </div>
            <div className="text-xl font-black text-white tracking-tight leading-none">
              WRAPPED
            </div>
          </div>
        </div>

        {/* Glassmorphism hero card */}
        <Glass className="w-full p-8 flex flex-col items-center gap-5">
          <div className="font-black text-5xl text-white leading-none tracking-tight">
            Turn your <Neon color="#25D366">chats</Neon> into
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#FF2D75,#B84CFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              unforgettable
            </span>
            <br />
            insights.
          </div>
          <div className="text-white/50 text-sm leading-relaxed">
            Spotify Wrapped, but for your WhatsApp. Discover your texting
            personality, love score, and more ✨
          </div>
          <div className="flex flex-col gap-3 w-full mt-2">
            <button
              onClick={onUpload}
              className="w-full py-4 rounded-2xl font-black text-black text-base"
              style={{
                background: "linear-gradient(135deg,#25D366,#128C7E)",
                boxShadow: "0 0 25px #25D36660",
              }}
            >
              📁 Upload Chat
            </button>
            <button
              onClick={onDemo}
              className="w-full py-3 rounded-2xl font-bold text-white/80 text-sm border border-white/20"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              ✨ Try Demo Chat
            </button>
          </div>
        </Glass>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "🔒 Private",
            "📱 Mobile-first",
            "✨ AI Insights",
            "📊 Deep Stats",
          ].map((f) => (
            <span
              key={f}
              className="text-xs text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
