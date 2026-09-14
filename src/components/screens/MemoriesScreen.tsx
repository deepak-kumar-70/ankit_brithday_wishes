import React, { useState } from 'react';
import { ROOMMATE_MEMORIES } from '../../data/content';
import { PersonalConfig, RoommateMemory } from '../../types';
import { soundEngine } from '../../utils/audio';
import { Image as ImageIcon, Heart, Sparkles, X, ArrowRight, Tag } from 'lucide-react';

interface MemoriesScreenProps {
  config: PersonalConfig;
  onNext: () => void;
}

export const MemoriesScreen: React.FC<MemoriesScreenProps> = ({ onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<RoommateMemory | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    'mem-1': 129,
    'mem-2': 95,
    'mem-3': 157,
    'mem-4': 113,
  });

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    soundEngine.playChime();
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-5 pb-12 pt-2 text-center">
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1f2a]/90 backdrop-blur-md border border-white/10 shadow-sm">
        <ImageIcon className="w-3.5 h-3.5 text-[#a78bfa]" />
        <span className="text-[11px] font-bold text-[#ffdf9b] uppercase tracking-widest">
          CHAPTER 03 • PHOTO VAULT
        </span>
      </div>

      <div className="space-y-1.5 px-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#dfe2f1]">
          Dorm Room Chronicles
        </h1>
        <p className="text-xs sm:text-sm text-[#ddbfc3]">
          Snapped between study marathons and midnight food runs.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {ROOMMATE_MEMORIES.map((item, idx) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedPhoto(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedPhoto(item);
            }}
            className={`rounded-2xl overflow-hidden bg-[#171b26]/90 border border-white/10 p-3 shadow-lg hover:border-[#ff7597]/40 transition-all hover:scale-[1.02] cursor-pointer flex flex-col group ${
              idx % 2 === 0 ? 'rotate-[-0.8deg]' : 'rotate-[0.8deg]'
            }`}
          >
            {/* Photo */}
            <div className="relative h-48 w-full rounded-xl overflow-hidden bg-black/40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 text-[10px] font-mono font-bold bg-black/60 text-[#ffdf9b] px-2 py-0.5 rounded-md backdrop-blur-md">
                {item.date}
              </span>
            </div>

            {/* Caption & Info */}
            <div className="p-2 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#dfe2f1] line-clamp-1 group-hover:text-[#ffb1c0] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#edc157] font-medium">
                  {item.subtitle}
                </p>
                <p className="text-xs text-[#ddbfc3] line-clamp-2 mt-1">
                  {item.caption}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs text-[#ddbfc3]">
                <div className="flex items-center gap-1 text-[10px]">
                  <Tag className="w-3 h-3 text-[#ff7597]" />
                  <span>{item.tags.join(', ')}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleLike(e, item.id)}
                  className="flex items-center gap-1 text-xs text-[#ff7597] hover:scale-110 active:scale-95 transition-transform"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#ff7597]" />
                  <span>{likes[item.id] || item.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-lg w-full rounded-3xl bg-[#171b26] border border-white/20 p-4 shadow-2xl overflow-hidden text-left">
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <span className="text-xs font-mono text-[#edc157] font-bold">
                {selectedPhoto.subtitle} • {selectedPhoto.date}
              </span>
              <h3 className="text-lg font-bold text-[#dfe2f1]">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-[#ddbfc3] leading-relaxed">
                {selectedPhoto.caption}
              </p>

              <div className="pt-3 flex items-center justify-between border-t border-white/10">
                <span className="text-xs text-[#ddbfc3]">
                  Tags: {selectedPhoto.tags.map((t) => `#${t}`).join(' ')}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleLike(e, selectedPhoto.id)}
                  className="px-3 py-1 rounded-full bg-[#ff7597]/20 border border-[#ff7597]/40 text-[#ffb1c0] text-xs font-bold flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#ff7597]" />
                  <span>{likes[selectedPhoto.id]} Loves</span>
                </button>
              </div>
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
            See Roommate Superlatives
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
