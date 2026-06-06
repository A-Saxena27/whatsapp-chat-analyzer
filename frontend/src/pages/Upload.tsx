import React, { useRef, useState } from "react";

interface UploadProps {
  onUpload: (file: File) => void | Promise<void>;
}

export default function Upload({ onUpload }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-3">
          Upload WhatsApp Chat
        </h1>

        <p className="text-white/60 text-center mb-8">
          Export your WhatsApp chat and upload the .txt file
        </p>

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all ${
            dragging
              ? "border-green-400 bg-green-400/10"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="text-6xl mb-4">
            {file ? "✅" : "📁"}
          </div>

          {file ? (
            <>
              <p className="text-white font-semibold break-all">
                {file.name}
              </p>

              <p className="text-white/50 text-sm mt-2">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </>
          ) : (
            <>
              <p className="text-white text-lg font-semibold">
                Click to choose a file
              </p>

              <p className="text-white/50 mt-2">
                or drag & drop here
              </p>
            </>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".txt,.zip"
          style={{ display: "none" }}
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];

            if (selectedFile) {
              handleFileSelect(selectedFile);
            }
          }}
        />

        <button
          disabled={!file}
          onClick={() => {
            if (file) {
              onUpload(file);
            }
          }}
          className={`w-full mt-6 py-4 rounded-2xl font-bold transition-all ${
            file
              ? "bg-green-500 text-black"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Generate My Wrapped ✨
        </button>
      </div>
    </div>
  );
}