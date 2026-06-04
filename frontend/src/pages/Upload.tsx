import React, { useState, useRef } from "react";
import Particles from "../components/common/Loader";
interface UploadProps {
  onUpload: (file: File) => void;
}

export default function Upload({ onUpload }: UploadProps) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-6 gap-8">
      <Particles onDone={() => {}} />
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }}
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
