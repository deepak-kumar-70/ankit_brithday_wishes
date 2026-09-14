import React from 'react';
import { CHAPTERS } from '../data/content';
import { ChapterId } from '../types';
import { X, Sparkles, ChevronRight } from 'lucide-react';

interface ChapterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapterId: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
}

export const ChapterDrawer: React.FC<ChapterDrawerProps> = ({
  isOpen,
  onClose,
  currentChapterId,
  onSelectChapter,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] bg-[#0a0e18]/95 backdrop-blur-2xl border-l border-white/10 transform transition-transform duration-300 ease-out flex flex-col pt-safe pb-safe shadow-[-8px_0_36px_rgba(0,0,0,0.7)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ff7597]" />
            <h2 className="font-serif text-[19px] font-semibold text-[#dfe2f1]">
              Chapters
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close chapters menu"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#ddbfc3] hover:text-[#dfe2f1] hover:bg-white/5 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {CHAPTERS.map((chapter) => {
            const isActive = currentChapterId === chapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => {
                  onSelectChapter(chapter.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff7597]/20 to-[#edc157]/10 border border-[#ff7597]/30 text-[#dfe2f1] font-medium shadow-sm'
                    : 'text-[#ddbfc3] hover:text-[#dfe2f1] hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-[#edc157] text-[#251a00]'
                      : 'text-[#edc157] bg-[#edc157]/10'
                  }`}
                >
                  {chapter.number}
                </span>
                <span className="text-sm flex-1">{chapter.title}</span>
                {chapter.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#ff7597]/20 text-[#ffb1c0] border border-[#ff7597]/30">
                    {chapter.badge}
                  </span>
                )}
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-[#ff7597] translate-x-0.5' : 'opacity-30'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer Wish Note */}
        <div className="p-4 bg-[#1c1f2a]/60 border border-white/5 m-3 rounded-2xl">
          <p className="font-serif text-[17px] text-[#ffb1c0] font-semibold mb-1">
            Make a Wish 💫
          </p>
          <p className="text-xs text-[#ddbfc3] leading-relaxed">
            Created with stardust & midnight joy for your special day.
          </p>
        </div>
      </div>
    </>
  );
};
