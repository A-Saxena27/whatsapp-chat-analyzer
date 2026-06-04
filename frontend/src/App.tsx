import { useState } from "react";
import { uploadChat } from "./services/api";

import Landing from "./pages/Landing";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Wrapped from "./pages/Wrapped";

import FinalWrappedCard from "./components/wrapped/FinalWrappedCard";

import { demoWrappedData } from "./data/demoWrappedData";

type Screen = "landing" | "upload" | "processing" | "stories" | "final";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");

  const [wrappedData, setWrappedData] = useState<any>(null);

  return (
    <>
      {screen === "landing" && (
        <Landing
          onUpload={() => setScreen("upload")}
          onDemo={() => {
            setWrappedData(demoWrappedData);
            setScreen("stories");
          }}
        />
      )}
      {screen === "upload" && (
        <Upload
          onUpload={async (file) => {
            try {
              setScreen("processing");

              const result = await uploadChat(file);

              setWrappedData(result);

              setScreen("stories");
            } catch (error) {
              console.error(error);

              alert("Analysis failed");

              setScreen("upload");
            }
          }}
        />
      )}

      {screen === "processing" && <Processing onDone={() => {}} />}

      {screen === "stories" && (
        <Wrapped
          data={wrappedData || demoWrappedData}
          onFinish={() => setScreen("final")}
        />
      )}

      {screen === "final" && (
        <FinalWrappedCard
          data={wrappedData || demoWrappedData}
          onFinish={() => {
            setWrappedData(null);
            setScreen("landing");
          }}
        />
      )}
    </>
  );
}
