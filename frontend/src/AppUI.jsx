import { useState, useEffect, useRef, useCallback } from "react";

// ─── Utility helpers ──────────────────────────────────────────────────────────
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rand = (lo, hi) => Math.random() * (hi - lo) + lo;
const randInt = (lo, hi) => Math.floor(rand(lo, hi + 1));

// ─── Demo data ────────────────────────────────────────────────────────────────
const DEMO = {
  totalMessages: 48291,
  totalWords: 312847,
  totalMedia: 1847,
  totalLinks: 423,
  totalEmoji: 9234,
  loveScore: 87,
  partner: "Arya ✨",
  favoriteEmoji: "🥰",
  favoriteEmojiCount: 198,
  youResponseTime: "2m 13s",
  partnerResponseTime: "5m 42s",
  youStartsChat: 62,
  partnerStartsChat: 38,
  mostActiveTime: "11 PM – 1 AM",
  mostRomanticMsg: {
    text: "I literally think about you every single day, you know that? You make everything better just by existing 💚",
    date: "March 14, 2024",
  },
  peakMonth: "February 2024",
  monthlyData: [
    { month: "Jan", you: 1200, partner: 980 },
    { month: "Feb", you: 2100, partner: 1870 },
    { month: "Mar", you: 1650, partner: 1420 },
    { month: "Apr", you: 1890, partner: 1600 },
    { month: "May", you: 1340, partner: 1100 },
    { month: "Jun", you: 1760, partner: 1490 },
    { month: "Jul", you: 2080, partner: 1920 },
    { month: "Aug", you: 1530, partner: 1310 },
    { month: "Sep", you: 1970, partner: 1740 },
    { month: "Oct", you: 2240, partner: 2010 },
    { month: "Nov", you: 1850, partner: 1630 },
    { month: "Dec", you: 2300, partner: 2100 },
  ],
  topWords: [
    { word: "love", count: 847, size: 5 },
    { word: "haha", count: 712, size: 4 },
    { word: "okay", count: 634, size: 4 },
    { word: "miss", count: 521, size: 3 },
    { word: "please", count: 489, size: 3 },
    { word: "literally", count: 445, size: 3 },
    { word: "omg", count: 398, size: 2 },
    { word: "always", count: 367, size: 2 },
    { word: "wait", count: 312, size: 2 },
    { word: "together", count: 287, size: 2 },
  ],
  radarData: [
    { subject: "Love", A: 87 },
    { subject: "Humor", A: 91 },
    { subject: "Trust", A: 84 },
    { subject: "Support", A: 89 },
    { subject: "Loyalty", A: 78 },
    { subject: "Passion", A: 93 },
  ],
  achievements: [
    {
      icon: "🏆",
      title: "Night Owl",
      desc: "Most active after midnight",
      unlocked: true,
    },
    {
      icon: "🔥",
      title: "Streak Master",
      desc: "30-day chat streak",
      unlocked: true,
    },
    {
      icon: "😂",
      title: "Meme Lord",
      desc: "1000+ media files sent",
      unlocked: true,
    },
    {
      icon: "❤️",
      title: "Heart Collector",
      desc: "Used ❤️ 500+ times",
      unlocked: true,
    },
    {
      icon: "⚡",
      title: "Speed Typer",
      desc: "Avg reply < 3 minutes",
      unlocked: false,
    },
    {
      icon: "🌟",
      title: "Consistency King",
      desc: "Messaged every day",
      unlocked: false,
    },
  ],
  greenFlags: [
    "Lightning fast replies ⚡",
    "Consistent communication 💬",
    "Sends good morning texts ☀️",
    "Always checks in 💚",
  ],
  redFlags: [
    "Occasional late replies 🌙",
    "Read receipts on but silent 👀",
    "Short replies sometimes 📝",
  ],
};

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, duration = 1800, prefix = "", suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return (
    <>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </>
  );
}

// ─── Floating particles ───────────────────────────────────────────────────────
function Particles({ emojis = ["💚", "💬", "❤️", "✨", "🥰"], count = 18 }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: rand(5, 95),
      y: rand(5, 95),
      size: rand(16, 36),
      dur: rand(6, 14),
      delay: rand(0, 6),
    })),
  ).current;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.18,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: rand(0, 100),
      color: ["#25D366", "#FF2D75", "#B84CFF", "#FFD700", "#00CFFF"][i % 5],
      size: rand(6, 14),
      dur: rand(2, 5),
      delay: rand(0, 3),
    })),
  ).current;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm animate-confetti"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Progress bar (story-style) ───────────────────────────────────────────────
function StoryProgress({ total, current, onTick }) {
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

// ─── Glassmorphism card ───────────────────────────────────────────────────────
function Glass({ children, className = "", style = {} }) {
  return (
    <div
      className={`rounded-3xl backdrop-blur-xl border border-white/10 ${className}`}
      style={{ background: "rgba(255,255,255,0.06)", ...style }}
    >
      {children}
    </div>
  );
}

// ─── Neon text ────────────────────────────────────────────────────────────────
function Neon({ children, color = "#25D366", className = "" }) {
  return (
    <span
      className={className}
      style={{ color, textShadow: `0 0 20px ${color}80, 0 0 60px ${color}40` }}
    >
      {children}
    </span>
  );
}

// ─── Simple bar chart (no recharts dep needed) ────────────────────────────────
function BarChart({ data }) {
  const maxVal = Math.max(...data.map((d) => d.you + d.partner));
  return (
    <div className="flex items-end gap-1 h-32 w-full px-1">
      {data.map((d, i) => {
        const youH = (d.you / maxVal) * 100;
        const parH = (d.partner / maxVal) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className="w-full flex gap-0.5 items-end"
              style={{ height: "96px" }}
            >
              <div
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${youH}%`,
                  background: "linear-gradient(180deg,#25D366,#128C7E)",
                  boxShadow: "0 0 8px #25D36660",
                  transition: "height 1s cubic-bezier(.34,1.56,.64,1)",
                }}
              />
              <div
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${parH}%`,
                  background: "linear-gradient(180deg,#FF2D75,#B84CFF)",
                  boxShadow: "0 0 8px #FF2D7560",
                  transition: "height 1.2s cubic-bezier(.34,1.56,.64,1)",
                }}
              />
            </div>
            <span className="text-[8px] text-white/40 font-mono">
              {d.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Radar chart (pure SVG) ───────────────────────────────────────────────────
function RadarChart({ data }) {
  const cx = 110,
    cy = 110,
    r = 80;
  const n = data.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, radius) => ({
    x: cx + radius * Math.cos(angle(i)),
    y: cy + radius * Math.sin(angle(i)),
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const toPath = (pts) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  const dataPoints = data.map((d, i) => pt(i, (d.A / 100) * r));
  const dataPath = toPath(dataPoints);

  return (
    <svg width="220" height="220" className="mx-auto">
      {gridLevels.map((lvl) => {
        const pts = data.map((_, i) => pt(i, lvl * r));
        return (
          <polygon
            key={lvl}
            points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}
      {data.map((_, i) => {
        const p = pt(i, r);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={dataPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="rgba(37,211,102,0.2)"
        stroke="#25D366"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 8px #25D36680)" }}
      />
      {data.map((d, i) => {
        const p = pt(i, r + 18);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fill="rgba(255,255,255,0.7)"
            fontFamily="monospace"
          >
            {d.subject}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Donut chart ──────────────────────────────────────────────────────────────
function Donut({ pct, color = "#25D366", label }) {
  const r = 40,
    cx = 50,
    cy = 50;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative flex flex-col items-center">
      <svg width="100" height="100">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="white"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {pct}%
        </text>
      </svg>
      <span className="text-xs text-white/60 mt-1">{label}</span>
    </div>
  );
}

// ─── Word cloud ───────────────────────────────────────────────────────────────
function WordCloud({ words }) {
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

// ─── Heatmap ──────────────────────────────────────────────────────────────────
function Heatmap() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const peak = [22, 23, 0, 1];
  const vals = hours.map((h) =>
    peak.includes(h) ? rand(0.7, 1) : rand(0, 0.4),
  );
  return (
    <div className="w-full">
      <div className="flex gap-1 flex-wrap justify-center">
        {hours.map((h, i) => (
          <div
            key={h}
            className="rounded-md flex flex-col items-center"
            style={{
              width: 26,
              height: 26,
              background: `rgba(37,211,102,${vals[i].toFixed(2)})`,
              boxShadow: vals[i] > 0.6 ? "0 0 8px #25D36680" : "none",
            }}
            title={`${h}:00`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-white/40">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>11 PM</span>
      </div>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline({ data }) {
  const max = Math.max(...data.map((d) => d.you + d.partner));
  return (
    <div className="flex flex-col gap-2 w-full max-h-64 overflow-y-auto pr-1">
      {data.map((d, i) => {
        const pct = ((d.you + d.partner) / max) * 100;
        const isPeak = d.month === "Feb";
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/50 w-7 shrink-0">
              {d.month}
            </span>
            <div className="flex-1 h-5 rounded-full bg-white/5 overflow-hidden relative">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: isPeak
                    ? "linear-gradient(90deg,#FF2D75,#B84CFF)"
                    : "linear-gradient(90deg,#25D366,#128C7E)",
                  boxShadow: isPeak
                    ? "0 0 10px #FF2D7580"
                    : "0 0 10px #25D36640",
                  transition: "width 1s ease",
                }}
              />
              {isPeak && (
                <span className="absolute right-2 top-0 text-[9px] text-white/80 h-full flex items-center">
                  ⭐ Peak
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-white/40 w-10 text-right">
              {((d.you + d.partner) / 1000).toFixed(1)}k
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORY CARDS
// ═══════════════════════════════════════════════════════════════════════════════

function Card1({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      <Particles emojis={["💬", "✨", "🚀", "💚"]} />
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Total Messages
      </div>
      <div
        className="text-8xl font-black text-white leading-none"
        style={{ textShadow: "0 0 60px #25D36680" }}
      >
        <Neon color="#25D366">
          <Counter target={data.totalMessages} />
        </Neon>
      </div>
      <Glass className="px-6 py-3">
        <p className="text-white/70 text-sm">
          That's roughly{" "}
          <span className="text-green-400 font-bold">
            {Math.round(data.totalMessages / 365)} messages a day
          </span>{" "}
          🤯
        </p>
      </Glass>
      <div className="text-white/30 text-xs">between you & {data.partner}</div>
    </div>
  );
}

function Card2({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Messages Timeline
      </div>
      <Glass className="w-full p-4">
        <div className="flex gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ background: "#25D366" }}
            />{" "}
            You
          </span>
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ background: "#FF2D75" }}
            />{" "}
            {data.partner}
          </span>
        </div>
        <BarChart data={data.monthlyData} />
      </Glass>
      <div className="text-white/50 text-xs">
        Peak month:{" "}
        <span className="text-pink-400 font-bold">{data.peakMonth}</span> 💕
      </div>
    </div>
  );
}

function Card3({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Most Used Words
      </div>
      <Glass className="w-full p-5">
        <WordCloud words={data.topWords} />
      </Glass>
      <div className="text-white/40 text-xs">
        Your top word?{" "}
        <Neon color="#25D366" className="font-bold text-sm">
          "{data.topWords[0].word}"
        </Neon>{" "}
        — used {data.topWords[0].count} times 💚
      </div>
    </div>
  );
}

function Card4({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <Particles emojis={[data.favoriteEmoji, "💫", "✨"]} count={20} />
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Emoji Personality
      </div>
      <div className="text-9xl animate-bounce-slow">{data.favoriteEmoji}</div>
      <Glass className="px-8 py-4">
        <div className="text-5xl font-black text-white mb-1">
          <Counter target={data.favoriteEmojiCount} />
        </div>
        <div className="text-white/60 text-sm">times used</div>
      </Glass>
      <div className="text-white/40 text-sm">
        Your spirit emoji is{" "}
        <span className="text-yellow-300">{data.favoriteEmoji}</span>
      </div>
    </div>
  );
}

function Card5({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Response Time Battle
      </div>
      <div className="flex gap-6 w-full">
        <Glass className="flex-1 p-5 flex flex-col items-center gap-2">
          <div className="text-2xl">⚡</div>
          <div className="text-xs text-white/50 font-mono uppercase">You</div>
          <div className="text-2xl font-black text-green-400">
            {data.youResponseTime}
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-green-400 w-4/5"
              style={{ boxShadow: "0 0 10px #25D366" }}
            />
          </div>
          <div className="text-green-400 text-xs font-bold">⚡ WINNER</div>
        </Glass>
        <Glass className="flex-1 p-5 flex flex-col items-center gap-2">
          <div className="text-2xl">🐢</div>
          <div className="text-xs text-white/50 font-mono uppercase">
            {data.partner}
          </div>
          <div className="text-2xl font-black text-pink-400">
            {data.partnerResponseTime}
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-pink-400 w-2/5"
              style={{ boxShadow: "0 0 10px #FF2D75" }}
            />
          </div>
          <div className="text-pink-400 text-xs font-bold">🐢 slow</div>
        </Glass>
      </div>
      <div className="text-white/40 text-xs">You reply 2.5× faster 🏃‍♂️</div>
    </div>
  );
}

function Card6({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Night Owl Analysis
      </div>
      <div className="text-5xl">🌙</div>
      <Glass className="px-8 py-4">
        <div className="text-xl font-black text-white">Most Active Time</div>
        <Neon color="#B84CFF" className="text-3xl font-black">
          {data.mostActiveTime}
        </Neon>
      </Glass>
      <Glass className="w-full p-4">
        <div className="text-xs text-white/50 mb-3 font-mono">
          Hourly Activity Heatmap
        </div>
        <Heatmap />
      </Glass>
      <div className="text-white/40 text-xs">Certified night owl duo 🦉</div>
    </div>
  );
}

function Card7({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Conversation Starter
      </div>
      <div className="text-4xl">💬</div>
      <div className="flex gap-8 items-center">
        <Donut pct={data.youStartsChat} color="#25D366" label="You" />
        <div className="text-white/30 text-2xl">vs</div>
        <Donut
          pct={data.partnerStartsChat}
          color="#FF2D75"
          label={data.partner}
        />
      </div>
      <Glass className="px-6 py-3 text-sm text-white/70">
        You initiate <span className="text-green-400 font-bold">62%</span> of
        conversations. Clingy? Maybe. Caring? Absolutely. 💚
      </Glass>
    </div>
  );
}

function Card8({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Relationship Timeline
      </div>
      <Glass className="w-full p-4">
        <Timeline data={data.monthlyData} />
      </Glass>
      <Glass className="px-6 py-3">
        <span className="text-pink-400 font-bold">🌸 {data.peakMonth}</span>
        <span className="text-white/60 text-sm">
          {" "}
          was your peak. Something special happened? 👀
        </span>
      </Glass>
    </div>
  );
}

function Card9({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Love & Dating Analysis
      </div>
      <RadarChart data={data.radarData} />
      <div className="grid grid-cols-2 gap-2 w-full">
        {[
          {
            label: "❤️ Love Score",
            val: `${data.loveScore}%`,
            color: "#FF2D75",
          },
          { label: "😂 Humor Match", val: "91%", color: "#FFD700" },
          { label: "💚 Green Flags", val: "88%", color: "#25D366" },
          { label: "📱 Attachment", val: "HIGH", color: "#B84CFF" },
        ].map((s) => (
          <Glass key={s.label} className="p-3 text-center">
            <div className="text-xs text-white/50">{s.label}</div>
            <div
              className="font-black text-lg"
              style={{ color: s.color, textShadow: `0 0 15px ${s.color}80` }}
            >
              {s.val}
            </div>
          </Glass>
        ))}
      </div>
      <div className="text-white/40 text-xs">
        ✨ Relationship Type:{" "}
        <span className="text-purple-400 font-bold">
          Best Friends to Lovers
        </span>
      </div>
    </div>
  );
}

function Card10({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-4 text-center">
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Flags Report
      </div>
      <Glass
        className="w-full p-4"
        style={{
          background: "rgba(37,211,102,0.08)",
          borderColor: "rgba(37,211,102,0.2)",
        }}
      >
        <div className="text-green-400 font-bold mb-3 flex items-center gap-2">
          🟢 Green Flags
        </div>
        <div className="flex flex-col gap-2">
          {data.greenFlags.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-green-400/10 rounded-xl px-3 py-2 text-sm text-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </Glass>
      <Glass
        className="w-full p-4"
        style={{
          background: "rgba(255,45,117,0.08)",
          borderColor: "rgba(255,45,117,0.2)",
        }}
      >
        <div className="text-pink-400 font-bold mb-3 flex items-center gap-2">
          🚩 Red Flags
        </div>
        <div className="flex flex-col gap-2">
          {data.redFlags.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-pink-400/10 rounded-xl px-3 py-2 text-sm text-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </Glass>
    </div>
  );
}

function Card11({ data }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      <Particles emojis={["💌", "✨", "🥹", "💞"]} count={14} />
      <div className="text-white/50 text-sm font-mono tracking-widest uppercase">
        Most Romantic Message
      </div>
      <div className="text-5xl animate-pulse-slow">💌</div>
      <Glass
        className="w-full p-6 relative"
        style={{
          background: "rgba(255,45,117,0.08)",
          borderColor: "rgba(255,45,117,0.3)",
        }}
      >
        <div className="text-6xl absolute -top-4 -left-2 opacity-20">"</div>
        <p className="text-white text-base leading-relaxed italic font-light relative z-10">
          {data.mostRomanticMsg.text}
        </p>
        <div className="text-6xl absolute -bottom-8 -right-2 opacity-20">"</div>
      </Glass>
      <div className="text-white/40 text-xs font-mono">
        📅 {data.mostRomanticMsg.date}
      </div>
    </div>
  );
}

function Card12({ data }) {
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

// ─── Final wrapped screen ─────────────────────────────────────────────────────
function FinalScreen({ data, onRestart }) {
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-5 text-center relative">
      {showConfetti && <Confetti />}
      <Particles emojis={["🎉", "💚", "✨", "🎊", "🏆"]} count={16} />
      <div className="text-white/50 text-xs font-mono tracking-widest uppercase">
        Your
      </div>
      <div className="font-black text-4xl text-white leading-none">
        WhatsApp
      </div>
      <div
        className="font-black text-5xl leading-none"
        style={{
          background: "linear-gradient(135deg,#25D366,#B84CFF,#FF2D75)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        WRAPPED 2025
      </div>
      <div className="grid grid-cols-3 gap-3 w-full mt-2">
        {[
          { label: "Messages", val: data.totalMessages, icon: "💬" },
          { label: "Words", val: data.totalWords, icon: "📝" },
          { label: "Media", val: data.totalMedia, icon: "📸" },
          { label: "Links", val: data.totalLinks, icon: "🔗" },
          { label: "Emoji", val: data.totalEmoji, icon: "😊" },
          {
            label: "Love Score",
            val: `${data.loveScore}%`,
            icon: "❤️",
            raw: true,
          },
        ].map((s) => (
          <Glass key={s.label} className="p-3 flex flex-col items-center gap-1">
            <div className="text-xl">{s.icon}</div>
            <div className="font-black text-lg text-white">
              {s.raw ? s.val : <Counter target={s.val} duration={1200} />}
            </div>
            <div className="text-[9px] text-white/40 uppercase tracking-wider">
              {s.label}
            </div>
          </Glass>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full mt-2">
        <button
          className="w-full py-3 rounded-2xl font-bold text-sm text-black"
          style={{
            background: "linear-gradient(135deg,#25D366,#128C7E)",
            boxShadow: "0 0 20px #25D36660",
          }}
        >
          📤 Share as Story
        </button>
        <button
          className="w-full py-3 rounded-2xl font-bold text-sm text-white border border-white/20"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          📊 Download Report
        </button>
        <button
          onClick={onRestart}
          className="w-full py-3 rounded-2xl font-bold text-sm text-white/60 text-xs"
        >
          🔄 Analyze Another Chat
        </button>
      </div>
    </div>
  );
}

// ─── Story wrapper ────────────────────────────────────────────────────────────
const CARDS = [
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
  Card7,
  Card8,
  Card9,
  Card10,
  Card11,
  Card12,
];

function StoryExperience({ data, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CARDS.length;

  const next = useCallback(() => {
    if (current < total - 1) setCurrent((c) => c + 1);
    else onFinish();
  }, [current, total, onFinish]);

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const bgGradients = [
    "from-green-950 via-black to-black",
    "from-black via-indigo-950 to-black",
    "from-purple-950 via-black to-black",
    "from-yellow-950 via-black to-black",
    "from-green-950 via-black to-pink-950",
    "from-blue-950 via-black to-purple-950",
    "from-green-950 via-black to-black",
    "from-pink-950 via-black to-black",
    "from-purple-950 via-black to-black",
    "from-green-950 via-black to-pink-950",
    "from-pink-950 via-black to-black",
    "from-yellow-950 via-black to-black",
  ];

  const CardComponent = CARDS[current];

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br ${bgGradients[current]} flex flex-col`}
      style={{ fontFamily: "'Syne', 'Space Grotesk', sans-serif" }}
      onClick={(e) => {
        const w = window.innerWidth;
        if (e.clientX < w / 3) prev();
        else next();
      }}
    >
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#25D366" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl"
          style={{ background: "#FF2D75" }}
        />
      </div>

      <StoryProgress total={total} current={current} onTick={next} />

      {/* header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{ background: "#25D366" }}
          >
            💬
          </div>
          <span className="text-white text-sm font-bold">WhatsApp Wrapped</span>
        </div>
        <div className="text-white/40 text-xs font-mono">
          {current + 1}/{total}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <CardComponent data={data} />
      </div>

      {/* tap hints */}
      <div className="flex justify-between px-6 pb-4 z-10 pointer-events-none">
        <div className="text-white/20 text-xs">← tap left</div>
        <div className="text-white/20 text-xs">tap right →</div>
      </div>
    </div>
  );
}

// ─── Processing screen ────────────────────────────────────────────────────────
function ProcessingScreen({ onDone }) {
  const steps = [
    "Analyzing messages...",
    "Finding favorite emoji...",
    "Calculating compatibility...",
    "Detecting red flags... 🚩",
    "Building your Wrapped ✨",
  ];
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    const i = Math.floor((pct / 100) * steps.length);
    setStep(Math.min(i, steps.length - 1));
  }, [pct]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 px-8 text-center">
      <Particles emojis={["💬", "✨", "📊", "💚", "🔍"]} count={20} />
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#25D366"
            strokeWidth="8"
            strokeDasharray={`${pct * 3.14} 314`}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 10px #25D366)",
              transition: "stroke-dasharray 0.1s",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black text-white">{pct}%</span>
        </div>
      </div>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-500 ${i === step ? "opacity-100 scale-105" : i < step ? "opacity-40" : "opacity-20"}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${i < step ? "bg-green-400" : i === step ? "bg-white animate-pulse" : "bg-white/20"}`}
            />
            <span
              className={`text-sm ${i === step ? "text-white font-bold" : "text-white/50"}`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Upload screen ────────────────────────────────────────────────────────────
function UploadScreen({ onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-6 gap-8">
      <Particles emojis={["📁", "💬", "✨", "📤"]} count={12} />
      <div className="text-center">
        <h2 className="text-3xl font-black text-white">Upload Your Chat</h2>
        <p className="text-white/50 text-sm mt-2">
          Export from WhatsApp → More → Export Chat → Without Media
        </p>
      </div>
      <div
        className={`w-full max-w-sm border-2 border-dashed rounded-3xl p-10 flex flex-col items-center gap-4 transition-all cursor-pointer ${dragging ? "border-green-400 bg-green-400/10" : "border-white/20 bg-white/5"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".txt"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="text-5xl">{file ? "✅" : "📁"}</div>
        {file ? (
          <>
            <div className="text-white font-bold text-sm">{file.name}</div>
            <div className="text-white/40 text-xs">
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </>
        ) : (
          <>
            <div className="text-white/60 text-sm font-medium">
              Drop your .txt file here
            </div>
            <div className="text-white/30 text-xs">or click to browse</div>
          </>
        )}
      </div>
      <button
        onClick={() => file && onUpload(file)}
        disabled={!file}
        className="w-full max-w-sm py-4 rounded-2xl font-black text-black text-lg transition-all"
        style={{
          background: file
            ? "linear-gradient(135deg,#25D366,#128C7E)"
            : "rgba(255,255,255,0.1)",
          color: file ? "black" : "rgba(255,255,255,0.3)",
          boxShadow: file ? "0 0 30px #25D36660" : "none",
        }}
      >
        Generate My Wrapped ✨
      </button>
    </div>
  );
}

// ─── Landing page ─────────────────────────────────────────────────────────────
function Landing({ onUpload, onDemo }) {
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

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function AppUI() {
  // screens: landing | upload | processing | stories | final
  const [screen, setScreen] = useState("landing");
  const [data] = useState(DEMO);

  const goTo = (s) => setScreen(s);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #050505; font-family: 'Syne', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #25D36640; border-radius: 4px; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-3deg); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes story-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes blob1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(60px,40px) scale(1.1); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-40px,-60px) scale(1.15); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-50px,30px) scale(0.9); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-float { animation: float linear infinite; }
        .animate-confetti { animation: confetti-fall linear forwards; }
        .animate-story-fill { animation: story-fill 5s linear forwards; }
        .animate-blob1 { animation: blob1 8s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 11s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 9s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>

      {screen === "landing" && (
        <Landing
          onUpload={() => goTo("upload")}
          onDemo={() => goTo("processing")}
        />
      )}
      {screen === "upload" && (
        <UploadScreen onUpload={() => goTo("processing")} />
      )}
      {screen === "processing" && (
        <ProcessingScreen onDone={() => goTo("stories")} />
      )}
      {screen === "stories" && (
        <StoryExperience data={data} onFinish={() => goTo("final")} />
      )}
      {screen === "final" && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-black to-green-950 overflow-y-auto">
          <div className="max-w-sm mx-auto min-h-full flex flex-col py-8">
            <FinalScreen data={data} onRestart={() => goTo("landing")} />
          </div>
        </div>
      )}
    </>
  );
}
