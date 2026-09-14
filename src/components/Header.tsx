import React from 'react';
import { CAKE_BADGE_IMG } from '../data/content';
import { ChapterId } from '../types';
import { BookOpen, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentChapterId: ChapterId;
  currentChapterTitle: string;
  onOpenChapters: () => void;
  onOpenPersonalizer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapterId,
  currentChapterTitle,
  onOpenChapters,
  onOpenPersonalizer,
}) => {
  const getSubtitle = () => {
    switch (currentChapterId) {
      case 'welcome': return 'WELCOME';
      case 'journey': return 'JOURNEY';
      case 'mini-game': return 'CHALLENGE';
      case 'memories': return 'MEMORIES';
      case 'message': return 'LETTER';
      case 'roommate': return 'SUPERLATIVES';
      case 'big-surprise': return 'SURPRISE';
      case 'final-wishes': return 'WISHES';
      default: return 'STORY';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-[#0a0e18]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.35)]">
      <div className="max-w-3xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand / Chapter Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative">
            <img
              src={CAKE_BADGE_IMG}
              alt="Birthday Surprise Emblem"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-[#edc157]/40 shadow-[0_0_12px_rgba(255,177,192,0.4)]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#edc157] rounded-full border-2 border-[#0a0e18] flex items-center justify-center">
              <Sparkles className="w-1.5 h-1.5 text-[#0a0e18]" />
            </span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1 font-serif text-[18px] text-[#dfe2f1] font-semibold tracking-tight leading-tight">
              <span>Surprise</span>
              <span className="text-[#edc157]">✨</span>
            </div>
            <span className="text-[10px] font-bold text-[#edc157] uppercase tracking-widest leading-none mt-0.5">
              {getSubtitle()}
            </span>
          </div>
        </div>

        {/* Story Live Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1f2a]/80 backdrop-blur-md border border-white/10 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-[#edc157] animate-ping" />
          <span className="text-[11px] font-bold tracking-widest text-[#edc157]">STORY</span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2">
          {/* Chapter Drawer Toggle */}
          <button
            type="button"
            aria-label="Open chapters menu"
            onClick={onOpenChapters}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#262a35]/70 hover:bg-[#313540] border border-white/10 text-[#dfe2f1] transition-all active:scale-95 shadow-sm"
          >
            <BookOpen className="w-[18px] h-[18px] text-[#dfe2f1]" />
          </button>

          {/* Profile / Personalize Button */}
          <button
            type="button"
            aria-label="Personalize Names"
            onClick={onOpenPersonalizer}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff7597] to-[#ffb1c0] flex items-center justify-center shadow-[0_0_12px_rgba(255,117,151,0.5)] active:scale-95 transition-transform"
          >
            <User className="w-4 h-4 text-[#660029]" />
          </button>
        </div>
      </div>
    </header>
  );
};
