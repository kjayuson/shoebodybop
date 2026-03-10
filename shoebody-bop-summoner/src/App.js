import { useRef, useState } from "react";
import YouTube from "react-youtube";

function App() {
  const [names, setNames] = useState([
    "Robert",
    "John",
    "Jamie",
    "Ken",
    "Steven",
  ]);
  const [newName, setNewName] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isSummoning, setIsSummoning] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const videoRef = useRef(null);

  const addName = () => {
    if (newName.trim()) {
      setNames([...names, newName]);
      setNewName("");
    }
  };

  const removeName = (index) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const summonName = () => {
    setIsSummoning(true);
    setSelectedName("");
    setShowVideo(true);
  };

  const handleVideoReady = (event) => {
    videoRef.current = event.target;
    videoRef.current.seekTo(64); // Adjust to the meme part
    videoRef.current.playVideo();
  };

  const handleVideoPlay = () => {
    setTimeout(() => {
      const random = names
        .map((name) => ({ name, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)[0].name;
      setSelectedName(random);
      setIsSummoning(false);
      setShowVideo(false);
    }, 8000);
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
        textAlign: "center",
        padding: "4rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
        🎵 Shoebody Bop Name Summoner 🎵
      </h1>

      <button
        onClick={summonName}
        disabled={isSummoning}
        style={{
          backgroundColor: "#e11d48",
          color: "#fff",
          padding: "2rem 4rem",
          borderRadius: "999px",
          fontSize: "2rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isSummoning ? "Summoning..." : "Summon a Name"}
      </button>

      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addName()}
            placeholder="Enter a name"
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "2px solid #e11d48",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          />
          <button
            onClick={addName}
            style={{
              backgroundColor: "#10b981",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          {names.map((name, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#374151",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{name}</span>
              <button
                onClick={() => removeName(index)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        {showVideo && (
          <YouTube
            videoId="mRNtw_Tc1Jc"
            opts={{
              height: "540",
              width: "960",
              playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
              },
            }}
            onReady={handleVideoReady}
            onPlay={handleVideoPlay}
          />
        )}

        {selectedName && !isSummoning && (
          <div
            style={{
              fontSize: "3rem",
              marginTop: "2rem",
              color: "#facc15",
              animation: "bounce 1s infinite",
            }}
          >
            ✨ {selectedName} has been summoned! ✨
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
