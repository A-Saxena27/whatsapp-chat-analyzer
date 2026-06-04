import Donut from "./shared/DonutChart";
import Glass from "../common/GlassCard";

type ConversationData = {
  youStartsChat: number;
  partnerStartsChat: number;
  partner: string;
};

export default function ConversationStarterCard({ data }: { data: ConversationData }) {
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