import React, { useState } from 'react';
import { PersonalConfig } from '../../types';
import { soundEngine } from '../../utils/audio';
import { Mail, Heart, Sparkles, Scroll, ArrowRight, Quote } from 'lucide-react';

interface MessageScreenProps {
  config: PersonalConfig;
  onNext: () => void;
}

export const MessageScreen: React.FC<MessageScreenProps> = ({ config, onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      soundEngine.playSuccessSound();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-6 pb-12 pt-2 text-center">
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1f2a]/90 backdrop-blur-md border border-white/10 shadow-sm">
        <Mail className="w-3.5 h-3.5 text-[#ff7597]" />
        <span className="text-[11px] font-bold text-[#ffdf9b] uppercase tracking-widest">
          CHAPTER 02 • THE LETTER
        </span>
      </div>

      <div className="space-y-1.5 px-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#dfe2f1]">
          A Letter To My Roommate
        </h1>
        <p className="text-xs sm:text-sm text-[#ddbfc3]">
          Words that usually stay unspoken between late-night snacks and busy days.
        </p>
      </div>

      {/* Interactive Envelope & Letter */}
      {!isOpen ? (
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpenEnvelope}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope();
          }}
          className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#262a35] to-[#1c1f2a] border border-white/15 p-8 shadow-2xl flex flex-col items-center justify-center space-y-4 cursor-pointer hover:border-[#ff7597]/50 active:scale-95 transition-all group select-none"
        >
          {/* Wax Seal */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#740430] via-[#ff7597] to-[#edc157] flex items-center justify-center shadow-[0_0_24px_rgba(255,117,151,0.5)] group-hover:scale-110 transition-transform">
              <Heart className="w-9 h-9 text-white fill-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#edc157] text-[#251a00] flex items-center justify-center text-xs font-bold border-2 border-[#1c1f2a]">
              ★
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-[#dfe2f1]">
              Strictly Confidential for {config.roommateName}
            </h3>
            <p className="text-xs text-[#edc157] font-medium">
              Tap the wax seal to unseal letter
            </p>
          </div>

          <span className="text-[11px] text-[#ddbfc3] bg-white/5 px-3 py-1 rounded-full border border-white/5">
            Postmarked from {config.dormNumber}, {config.collegeOrCity}
          </span>
        </div>
      ) : (
        <div className="w-full rounded-3xl bg-[#171b26]/95 border border-[#ff7597]/30 p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#ff7597]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Letter Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#edc157]" />
              <span className="font-mono text-xs text-[#edc157] uppercase tracking-wider font-semibold">
                Room 304 Confidential
              </span>
            </div>
            <span className="text-xs text-[#ddbfc3] italic">Today</span>
          </div>

          {/* Letter Body */}
          <div className="space-y-4 font-sans text-sm sm:text-base text-[#dfe2f1] leading-relaxed">
            <p className="font-serif text-lg text-[#ffb1c0] font-semibold">
              Dear {config.roommateName},
            </p>

            <p>
              When I moved into <strong className="text-[#ffdf9b]">{config.dormNumber}</strong>, I had no idea who I would be living with. Dorm assignments are basically a cosmic coin flip—you could get a stranger, a quiet neighbor, or someone you just tolerate.
            </p>

            <p>
              Instead, I got you. A brother, a partner-in-crime, and someone who turned four plain walls into a place that truly felt like home.
            </p>

            {/* Highlighted Quote Box */}
            <div className="p-4 rounded-2xl bg-[#0f131d]/80 border-l-4 border-[#ff7597] my-3 space-y-1">
              <Quote className="w-4 h-4 text-[#ff7597] opacity-60" />
              <p className="font-serif italic text-sm text-[#ffdf9b]">
                “Thank you for the 3 AM philosophical epiphanies, the shared burnt midnight snacks, and for never complaining when I set four snooze alarms.”
              </p>
            </div>

            <p>
              On your birthday, I want you to know how much I appreciate your humor, your loyalty, and your big heart. The world is better with you in it, and college would have been infinitely duller without you.
            </p>

            <p>
              May this next year bring you every ounce of success, happiness, and unforgettable moments you deserve.
            </p>

            {/* Signature */}
            <div className="pt-4 border-t border-white/10 flex flex-col items-end">
              <span className="text-xs text-[#ddbfc3] italic">Always got your back,</span>
              <span className="font-serif text-lg font-bold text-[#ff7597] mt-1">
                {config.yourName} 🤝
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action to proceed */}
      <div className="w-full max-w-sm pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#ff7597] via-[#ffb1c0] to-[#edc157] text-[#660029] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-white drop-shadow-sm font-bold">
            Explore Memories & Milestones
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
