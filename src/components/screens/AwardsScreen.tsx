import React, { useState } from 'react';
import { ROOMMATE_AWARDS } from '../../data/content';
import { PersonalConfig } from '../../types';
import { soundEngine } from '../../utils/audio';
import { Trophy, Award, Sparkles, ArrowRight, Check, Flame, Clock, Brain, Music, Coffee } from 'lucide-react';

interface AwardsScreenProps {
  config: PersonalConfig;
  onNext: () => void;
}

export const AwardsScreen: React.FC<AwardsScreenProps> = ({ config, onNext }) => {
  const [conferred, setConferred] = useState<Record<string, boolean>>({
    'award-1': true,
    'award-2': true,
    'award-3': true,
    'award-4': true,
  });

  const toggleConfer = (id: string) => {
    setConferred((prev) => ({ ...prev, [id]: !prev[id] }));
    soundEngine.playSuccessSound();
  };

  const getAwardIcon = (iconName: string) => {
    switch (iconName) {
      case 'alarm_off': return <Clock className="w-6 h-6 text-[#edc157]" />;
      case 'skillet': return <Flame className="w-6 h-6 text-[#ff7597]" />;
      case 'psychology': return <Brain className="w-6 h-6 text-[#a78bfa]" />;
      case 'headphones': return <Music className="w-6 h-6 text-[#34d399]" />;
      default: return <Trophy className="w-6 h-6 text-[#edc157]" />;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-5 pb-12 pt-2 text-center">
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1f2a]/90 backdrop-blur-md border border-white/10 shadow-sm">
        <Trophy className="w-3.5 h-3.5 text-[#edc157]" />
        <span className="text-[11px] font-bold text-[#ffdf9b] uppercase tracking-widest">
          CHAPTER 04 • ROOMMATE AWARDS
        </span>
      </div>

      <div className="space-y-1.5 px-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#dfe2f1]">
          The Roommate Superlatives
        </h1>
        <p className="text-xs sm:text-sm text-[#ddbfc3]">
          Official recognition for habits, quirks, and survival skills in {config.dormNumber}.
        </p>
      </div>

      {/* Awards Grid */}
      <div className="w-full space-y-3 text-left">
        {ROOMMATE_AWARDS.map((award) => {
          const isGiven = conferred[award.id];
          return (
            <div
              key={award.id}
              className={`rounded-2xl p-4 transition-all border ${
                isGiven
                  ? 'bg-[#171b26]/95 border-[#edc157]/40 shadow-[0_4px_20px_rgba(237,193,87,0.12)]'
                  : 'bg-[#1c1f2a]/70 border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#262a35] border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                    {getAwardIcon(award.icon)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffdf9b] bg-[#edc157]/10 px-2 py-0.5 rounded">
                        {award.category}
                      </span>
                      <span className="text-xs font-bold text-[#ff7597]">
                        {award.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#dfe2f1]">
                      {award.title}
                    </h3>

                    <p className="text-xs text-[#ddbfc3] leading-relaxed">
                      {award.description}
                    </p>

                    <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#ffdf9b] font-mono">
                      <Sparkles className="w-3 h-3 text-[#edc157]" />
                      <span>Verified Stat: {award.funStat}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleConfer(award.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isGiven
                      ? 'bg-[#edc157] text-[#251a00] border-[#edc157] shadow-sm'
                      : 'bg-white/5 text-[#ddbfc3] border-white/10 hover:bg-white/10'
                  }`}
                  title={isGiven ? "Award conferred" : "Confer award"}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action to proceed to Journey */}
      <div className="w-full max-w-sm pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#ff7597] via-[#ffb1c0] to-[#edc157] text-[#660029] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-white drop-shadow-sm font-bold">
            Explore Chapter 05: Our Journey
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
