import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audio';
import { Play, Pause, Volume2, VolumeX, Disc, SkipForward } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [track, setTrack] = useState(soundEngine.getCurrentTrack());

  const handleTogglePlay = () => {
    const playing = soundEngine.togglePlay((state) => setIsPlaying(state));
    setIsPlaying(playing);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = soundEngine.nextTrack();
    setTrack(next);
    if (!isPlaying) {
      handleTogglePlay();
    }
  };

  return (
    <div className="fixed bottom-24 right-4 sm:right-8 z-40 flex flex-col items-end gap-1.5 pointer-events-auto select-none">
      {/* Track Name Bubble */}
      <button
        type="button"
        onClick={handleNextTrack}
        title="Click to switch track"
        className="px-3 py-1 rounded-full bg-[#0a0e18]/85 backdrop-blur-lg border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.5)] flex items-center gap-1.5 text-[#ddbfc3] hover:text-[#dfe2f1] max-w-[220px] transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#edc157] animate-pulse shrink-0" />
        <span className="text-[10px] font-mono tracking-wider truncate text-[#ffdf9b]">
          {track.title}
        </span>
        <SkipForward className="w-3 h-3 text-[#edc157]/70 shrink-0 ml-0.5" />
      </button>

      {/* Floating Vinyl Player Bar */}
      <div className="glow-pulse flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#262a35]/90 backdrop-blur-2xl border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.7)]">
        {/* Play/Pause Button with Rotating Vinyl Disk */}
        <button
          type="button"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          onClick={handleTogglePlay}
          className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#ff7597] to-[#edc157] flex items-center justify-center text-[#740430] shadow-[0_0_15px_rgba(255,117,151,0.5)] active:scale-95 transition-all cursor-pointer group"
        >
          {/* Vinyl Disc Body */}
          <div
            className={`w-9 h-9 rounded-full bg-[#0a0e18] flex items-center justify-center border border-white/10 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            {/* Vinyl Grooves */}
            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-[#906d00] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0f131d]" />
              </div>
            </div>
          </div>

          {/* Overlay Icon */}
          <span className="absolute inset-0 m-auto flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white text-white" />
            ) : (
              <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
            )}
          </span>
        </button>

        {/* Volume Mute Toggle */}
        <button
          type="button"
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          onClick={handleToggleMute}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#ddbfc3] hover:text-[#dfe2f1] active:scale-95 transition-all"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#ff7597]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#edc157]" />
          )}
        </button>
      </div>
    </div>
  );
};
