import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-10
        "
      >
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          Upload Chat
        </h1>

        <div
          className="
            border-2
            border-dashed
            border-[#25D366]
            rounded-3xl
            p-20
            text-center
            cursor-pointer
            hover:bg-white/5
            transition-all
          "
        >
          <Upload size={60} className="mx-auto text-[#25D366]" />

          <p className="text-white text-xl mt-4">Drag & Drop WhatsApp Export</p>

          <p className="text-gray-400 mt-2">Supported format: .txt</p>
        </div>

        <button
          className="
            mt-8
            w-full
            py-4
            rounded-2xl
            bg-[#25D366]
            text-black
            font-bold
            text-lg
          "
          onClick={() => navigate("/processing")}
        >
          Analyze Chat
        </button>
      </div>
    </div>
  );
}
