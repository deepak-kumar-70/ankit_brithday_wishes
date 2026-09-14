import React from 'react';
import { CHAPTERS } from '../data/content';
import { ChapterId } from '../types';
import { ArrowLeft, ArrowRight, Cake, Image as ImageIcon, Milestone as MilestoneIcon, Gift, Sparkles, Gamepad2 } from 'lucide-react';

interface BottomNavProps {
  currentChapterId: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentChapterId,
  onSelectChapter,
  onNext,
  onPrev,
}) => {
  const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapterId);
  const progressPercent = ((currentIndex + 1) / CHAPTERS.length) * 100;

  const keyTabs: { id: ChapterId; icon: React.ReactNode; label: string }[] = [
    { id: 'welcome', icon: <Cake className="w-5 h-5" />, label: 'Welcome' },
    { id: 'memories', icon: <ImageIcon className="w-5 h-5" />, label: 'Memories' },
    { id: 'journey', icon: <MilestoneIcon className="w-5 h-5" />, label: 'Journey' },
    { id: 'mini-game', icon: <Gamepad2 className="w-5 h-5" />, label: 'Game' },
    { id: 'big-surprise', icon: <Gift className="w-5 h-5" />, label: 'Gift' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-[#0a0e18]/90 backdrop-blur-2xl border-t border-white/10 shadow-[0_-4px_30px_rgba(0,0,0,0.6)]">
      {/* Chapter Progress Bar */}
      <div className="h-1.5 w-full bg-[#1c1f2a] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#ff7597] via-[#edc157] to-[#ff72ab] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Nav Controls */}
      <div className="max-w-3xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Prev Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`h-11 px-3.5 flex items-center gap-1 rounded-full bg-[#1c1f2a]/80 border border-white/10 text-[#dfe2f1] active:scale-95 transition-all text-xs font-semibold tracking-wider ${
            currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#262a35]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        {/* Center Quick Navigation Icons */}
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {keyTabs.map((tab) => {
            const isActive = currentChapterId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-label={tab.label}
                title={tab.label}
                onClick={() => onSelectChapter(tab.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                  isActive
                    ? 'text-[#ffb1c0] bg-[#ff7597]/20 border border-[#ff7597]/40 shadow-[0_0_12px_rgba(255,117,151,0.4)] scale-110'
                    : 'text-[#ddbfc3] hover:text-[#dfe2f1] hover:bg-white/5'
                }`}
              >
                {tab.icon}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="h-11 px-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff7597] to-[#edc157] text-[#660029] font-bold text-xs tracking-wider active:scale-95 shadow-[0_0_18px_rgba(255,117,151,0.4)] hover:shadow-[0_0_24px_rgba(237,193,87,0.5)] transition-all"
        >
          <span className="text-white drop-shadow-sm font-bold">
            {currentIndex === CHAPTERS.length - 1 ? 'Finish' : 'Next'}
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </nav>
  );
};
