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
  const [removeOnSummon, setRemoveOnSummon] = useState(() => {
    const savedRemoveOnSummon = localStorage.getItem("removeOnSummon");
    return savedRemoveOnSummon !== null
      ? JSON.parse(savedRemoveOnSummon)
      : true;
  });
  const [spinningName, setSpinningName] = useState("");
  const [floatingNames, setFloatingNames] = useState([]);

  const videoRef = useRef(null);
  const spinIntervalRef = useRef(null);
  const floatingIntervalRef = useRef(null);

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

  // Save removeOnSummon preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("removeOnSummon", JSON.stringify(removeOnSummon));
  }, [removeOnSummon]);

  const addName = () => {
    if (newName.trim()) {
      // Split by comma or space and filter out empty strings
      const newNames = newName
        .split(/[,\s]+/)
        .map((name) => name.trim())
        .filter((name) => name.length > 0);

      setNames([...names, ...newNames]);
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

  const startSpinning = (finalName) => {
    // Create floating name instances scattered around the screen
    const instances = [];
    for (let i = 0; i < 20; i++) {
      instances.push({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        x: Math.random() * 80 + 10, // 10-90% of screen
        y: Math.random() * 80 + 10,
        angle: Math.random() * 360,
        speed: Math.random() * 3 + 2,
        fontSize: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }
    setFloatingNames(instances);

    // Rapidly cycle the center spinning name
    let cycleSpeed = 60;
    let idx = 0;
    const cycle = () => {
      idx = (idx + 1) % names.length;
      setSpinningName(names[idx]);
      // Update floating names with random picks
      setFloatingNames((prev) =>
        prev.map((n) => ({
          ...n,
          name: names[Math.floor(Math.random() * names.length)],
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          angle: Math.random() * 360,
        }))
      );
      spinIntervalRef.current = setTimeout(cycle, cycleSpeed);
    };
    spinIntervalRef.current = setTimeout(cycle, cycleSpeed);

    // Slow down over time, then land on final name
    const slowDown = setTimeout(() => {
      cycleSpeed = 150;
    }, 4000);
    const slowMore = setTimeout(() => {
      cycleSpeed = 300;
    }, 6000);
    const settle = setTimeout(() => {
      cycleSpeed = 500;
    }, 7000);
    const stop = setTimeout(() => {
      clearTimeout(spinIntervalRef.current);
      setSpinningName(finalName);
      setFloatingNames([]);
    }, 7800);

    floatingIntervalRef.current = { slowDown, slowMore, settle, stop };
  };

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    const random = names
      .map((name) => ({ name, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)[0].name;

    // Start the spinning animation immediately
    startSpinning(random);

    setTimeout(() => {
      setSelectedName(random);
      setIsSummoning(false);
      setShowVideo(false);
      setSpinningName("");
      setFloatingNames([]);
      clearTimeout(spinIntervalRef.current);
      if (removeOnSummon) {
        setNames(names.filter((name) => name !== random));
      }
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

      <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="removeOnSummon"
              value="on"
              checked={removeOnSummon === true}
              onChange={() => setRemoveOnSummon(true)}
            />
            Remove name after summon
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="removeOnSummon"
              value="off"
              checked={removeOnSummon === false}
              onChange={() => setRemoveOnSummon(false)}
            />
            Keep name after summon
          </label>
        </div>
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
      {/* Floating names overlay */}
      {isSummoning && floatingNames.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {floatingNames.map((n) => (
            <div
              key={n.id}
              style={{
                position: "absolute",
                left: `${n.x}%`,
                top: `${n.y}%`,
                fontSize: `${n.fontSize}rem`,
                color: `hsl(${n.angle}, 100%, 70%)`,
                opacity: n.opacity,
                transform: `rotate(${n.angle}deg)`,
                fontWeight: "bold",
                textShadow: "0 0 10px currentColor",
                transition: "all 0.15s ease-out",
              }}
            >
              {n.name}
            </div>
          ))}
        </div>
      )}

      {/* Center spinning name */}
      {isSummoning && spinningName && (
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#facc15",
            textShadow: "0 0 20px #facc15, 0 0 40px #e11d48",
            margin: "1rem 0",
            zIndex: 20,
            position: "relative",
          }}
        >
          {spinningName}
        </div>
      )}

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
