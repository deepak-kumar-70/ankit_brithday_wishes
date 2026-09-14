import React, { useState } from 'react';
import { PersonalConfig } from '../../types';
import { soundEngine } from '../../utils/audio';
import { Sparkles, Star, Send, Heart, Share2, Copy, Check, Cake } from 'lucide-react';

interface WishesScreenProps {
  config: PersonalConfig;
  onRestart: () => void;
}

interface Wish {
  id: string;
  author: string;
  relation: string;
  message: string;
  stars: number;
}

export const WishesScreen: React.FC<WishesScreenProps> = ({ config, onRestart }) => {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 'w-1',
      author: config.yourName,
      relation: 'Your Roommate',
      message: `Happy Birthday to the greatest roommate anyone could ask for! May this year bring you all the dream offers, happiness, and midnight happiness you deserve.`,
      stars: 5,
    },
    {
      id: 'w-2',
      author: 'Floor 3 Dorm Gang',
      relation: 'Hallway Neighbors',
      message: 'Happy Birthday! Stop stealing our kettle and come over for tea anytime!',
      stars: 5,
    },
    {
      id: 'w-3',
      author: 'Campus Study Group',
      relation: 'Finals Survivors',
      message: 'Happy Birthday to the MVP who always had past exams and coffee ready!',
      stars: 5,
    },
  ]);

  const [inputAuthor, setInputAuthor] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [shootingStarActive, setShootingStarActive] = useState(false);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newWish: Wish = {
      id: `w-${Date.now()}`,
      author: inputAuthor.trim() || 'A Secret Friend',
      relation: 'Well-Wisher',
      message: inputMessage.trim(),
      stars: 5,
    };

    setWishes([newWish, ...wishes]);
    setInputMessage('');
    setInputAuthor('');
    soundEngine.playSuccessSound();

    // Trigger shooting star
    setShootingStarActive(true);
    setTimeout(() => setShootingStarActive(false), 2000);
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    soundEngine.playChime();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-6 pb-12 pt-2 text-center relative">
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1f2a]/90 backdrop-blur-md border border-white/10 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#edc157]" />
        <span className="text-[11px] font-bold text-[#ffdf9b] uppercase tracking-widest">
          CHAPTER 08 • WISHING STARS & FINALE
        </span>
      </div>

      <div className="space-y-1.5 px-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#dfe2f1]">
          Make a Birthday Wish, {config.roommateName} 🌟
        </h1>
        <p className="text-xs sm:text-sm text-[#ddbfc3]">
          Every candle blown, every memory made, lights up a star in your sky.
        </p>
      </div>

      {/* Interactive Wishing Sky Stage */}
      <div className="w-full h-44 rounded-3xl bg-gradient-to-b from-[#0a0e18] via-[#130f26] to-[#1c1635] border border-white/15 p-4 relative overflow-hidden flex flex-col items-center justify-center select-none shadow-xl">
        {/* Constellations and stars */}
        <div className="absolute top-4 left-8 w-2 h-2 rounded-full bg-[#ffdf9b] animate-ping" />
        <div className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-[#ff7597] animate-pulse" />
        <div className="absolute bottom-6 left-1/4 w-1 h-1 rounded-full bg-white animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-[#edc157] animate-ping" style={{ animationDuration: '3s' }} />

        {/* Shooting star animation */}
        {shootingStarActive && (
          <div className="absolute top-2 left-0 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#edc157] to-white transform rotate-45 animate-in slide-in-from-top-left duration-1000" />
        )}

        <div className="relative z-10 space-y-2">
          <Star className="w-10 h-10 text-[#edc157] mx-auto fill-[#edc157] animate-spin-slow" />
          <h3 className="font-serif text-lg font-bold text-[#dfe2f1]">
            The Sky Belongs To You Tonight
          </h3>
          <p className="text-xs text-[#ddbfc3]">
            Leave a special birthday note on the wall below
          </p>
        </div>
      </div>

      {/* Add a Wish Card */}
      <form
        onSubmit={handleAddWish}
        className="w-full rounded-2xl bg-[#171b26]/90 border border-white/10 p-4 text-left space-y-3 shadow-lg"
      >
        <span className="text-xs font-bold text-[#edc157] uppercase tracking-wider block">
          Add to {config.roommateName}'s Birthday Wall
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={inputAuthor}
            onChange={(e) => setInputAuthor(e.target.value)}
            placeholder="Your Name (e.g. Best Roomie, Mom...)"
            className="w-full px-3 py-2 rounded-xl bg-[#0f131d] border border-white/10 text-xs text-[#dfe2f1] focus:outline-none focus:border-[#ff7597]"
          />
        </div>

        <textarea
          rows={2}
          required
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Write a heartfelt message or funny memory for ${config.roommateName}...`}
          className="w-full px-3 py-2 rounded-xl bg-[#0f131d] border border-white/10 text-xs text-[#dfe2f1] focus:outline-none focus:border-[#ff7597]"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7597] to-[#edc157] text-[#660029] font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span className="text-white">Pin Wish to Sky</span>
          </button>
        </div>
      </form>

      {/* Wishes Wall */}
      <div className="w-full space-y-3 text-left">
        <h4 className="text-xs font-bold text-[#ddbfc3] uppercase tracking-wider px-1">
          Messages from the Dorm & Beyond ({wishes.length})
        </h4>

        {wishes.map((w) => (
          <div
            key={w.id}
            className="p-4 rounded-2xl bg-[#1c1f2a]/80 border border-white/5 space-y-1.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#dfe2f1]">
                  {w.author}
                </span>
                <span className="text-[10px] text-[#ffdf9b] bg-[#edc157]/10 px-2 py-0.5 rounded-full">
                  {w.relation}
                </span>
              </div>

              <div className="flex text-[#edc157]">
                {'★'.repeat(w.stars)}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#ddbfc3] leading-relaxed">
              "{w.message}"
            </p>
          </div>
        ))}
      </div>

      {/* Share / Keepsake Bar */}
      <div className="w-full rounded-2xl bg-[#171b26] border border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left">
          <h4 className="font-bold text-sm text-[#dfe2f1]">
            Share This Digital Keepsake
          </h4>
          <p className="text-xs text-[#ddbfc3]">
            Send this URL to your roommate so they can explore their surprise!
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyShare}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-[#dfe2f1] flex items-center gap-2 active:scale-95 transition-all shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#edc157]" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* Relive / Restart Journey Button */}
      <div className="w-full max-w-sm pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#ff7597] via-[#ffb1c0] to-[#edc157] text-[#660029] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Cake className="w-4 h-4 text-white" />
          <span className="text-white drop-shadow-sm font-bold">
            Blow Candle Again (Relive Journey)
          </span>
        </button>
      </div>
    </div>
  );
};
