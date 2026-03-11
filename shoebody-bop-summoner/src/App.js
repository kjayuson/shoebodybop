import { useEffect, useRef, useState } from "react";
import shoebodyBopVideo from "./assets/shoebodybop.mp4";

function App() {
  const [names, setNames] = useState(() => {
    const savedNames = localStorage.getItem("summonerNames");
    return savedNames
      ? JSON.parse(savedNames)
      : ["Robert", "John", "Jamie", "Ken", "Steven"];
  });
  const [newName, setNewName] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isSummoning, setIsSummoning] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const videoRef = useRef(null);

  // Load names from localStorage on mount
  useEffect(() => {
    const savedNames = localStorage.getItem("summonerNames");
    if (savedNames) {
      setNames(JSON.parse(savedNames));
    }
  }, []);

  // Save names to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("summonerNames", JSON.stringify(names));
  }, [names]);
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

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    setTimeout(() => {
      const random = names
        .map((name) => ({ name, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)[0].name;
      setSelectedName(random);
      setIsSummoning(false);
      setShowVideo(false);
      setNames(names.filter((name) => name !== random));
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
          <video
            ref={videoRef}
            width="960"
            height="540"
            onCanPlay={handleVideoPlay}
            style={{ borderRadius: "8px" }}
            autoplay
          >
            <source src={shoebodyBopVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
