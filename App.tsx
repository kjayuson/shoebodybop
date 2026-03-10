import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';

const names = [
  'Ken', 'Maria', 'Juniper', 'Lance', 'Althea', 'Gio', 'Sam', 'Nina',
];

export default function App() {
  const [selectedName, setSelectedName] = useState('');
  const [isSummoning, setIsSummoning] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const videoRef = useRef<any>(null);

  const summonName = () => {
    setIsSummoning(true);
    setSelectedName('');
    setShowVideo(true);
  };

  const handleVideoReady = (event: any) => {
    videoRef.current = event.target;
    if (videoRef.current) {
      videoRef.current.seekTo(64); // Start at a good part of the meme, adjust as needed
      videoRef.current.playVideo();
    }
  };

  const handleVideoPlay = () => {
    // Wait 2.5s, then reveal name (timed to meme punch)
    setTimeout(() => {
      const random = names[Math.floor(Math.random() * names.length)];
      setSelectedName(random);
      setIsSummoning(false);
      setShowVideo(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">🎵 Shoebody Bop Summoner</h1>

      <button 
        onClick={summonName}
        disabled={isSummoning}
        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full text-xl font-semibold"
      >
        {isSummoning ? 'Summoning...' : 'Summon a Name'}
      </button>

      <div className="mt-8">
        {showVideo && (
          <YouTube
            videoId="mRNtw_Tc1Jc" // e.g., 'dQw4w9WgXcQ'
            opts={{
              height: '360',
              width: '640',
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
          <div className="mt-6 text-3xl font-bold text-yellow-300 animate-bounce">
            ✨ {selectedName} has been summoned! ✨
          </div>
        )}
      </div>
    </div>
  );
}
