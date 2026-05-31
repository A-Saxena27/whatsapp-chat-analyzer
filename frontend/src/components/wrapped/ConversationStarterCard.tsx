type Props = {
  you: number;
  partner: number;
};

export default function ConversationStarterCard({ you, partner }: Props) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
      <h2 className="text-3xl font-bold">💬 Conversation Starter</h2>

      <div className="mt-8">
        <div className="text-6xl font-bold text-green-400">{you}%</div>

        <p>You start most chats</p>

        <div className="mt-4 text-xl">Partner: {partner}%</div>
      </div>
    </div>
  );
}
