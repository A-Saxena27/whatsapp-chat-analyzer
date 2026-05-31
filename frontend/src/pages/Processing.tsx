import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  "Analyzing Messages...",
  "Finding Favorite Emoji...",
  "Calculating Compatibility...",
  "Generating AI Insights...",
  "Building Your Wrapped...",
];

export default function Processing() {
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            navigate("/wrapped");
          }, 1000);

          return 100;
        }

        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  const currentStep =
    steps[Math.min(Math.floor(progress / 20), steps.length - 1)];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-xl p-10">
        <h1 className="text-white text-7xl font-bold text-center mb-6">
          {progress}%
        </h1>

        <p className="text-gray-400 text-center mb-6">{currentStep}</p>

        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#25D366] transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
