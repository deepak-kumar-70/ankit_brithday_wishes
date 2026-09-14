import React, { useState } from 'react';
import { JOURNEY_MILESTONES } from '../../data/content';
import { PersonalConfig } from '../../types';
import { soundEngine } from '../../utils/audio';
import {
  Compass,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Heart,
  Sparkles,
  Hotel,
  Key,
  UtensilsCrossed,
  Moon,
  Smile,
  BookOpen,
  Camera,
  Cake,
  Gamepad2,
  ArrowRight
} from 'lucide-react';

interface JourneyScreenProps {
  config: PersonalConfig;
  onGoToChallenge: () => void;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({ config, onGoToChallenge }) => {
  const [expandedId, setExpandedId] = useState<string | null>('today');
  const [likedMilestones, setLikedMilestones] = useState<Record<string, boolean>>({ today: true });

  const getMilestoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'hotel': return <Hotel className="w-5 h-5" />;
      case 'key': return <Key className="w-5 h-5" />;
      case 'ramen_dining': return <UtensilsCrossed className="w-5 h-5" />;
      case 'bedtime': return <Moon className="w-5 h-5" />;
      case 'sentiment_very_satisfied': return <Smile className="w-5 h-5" />;
      case 'menu_book': return <BookOpen className="w-5 h-5" />;
      case 'photo_camera': return <Camera className="w-5 h-5" />;
      case 'cake': return <Cake className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    soundEngine.playChime();
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedMilestones((prev) => ({ ...prev, [id]: !prev[id] }));
    soundEngine.playSuccessSound();
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-5 pb-12 pt-2">
      {/* Chapter 05 Pill */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1f2a]/90 backdrop-blur-md border border-white/10 shadow-sm">
        <Compass className="w-3.5 h-3.5 text-[#edc157]" />
        <span className="text-[11px] font-bold text-[#ffdf9b] uppercase tracking-widest">
          CHAPTER 05 • OUR JOURNEY
        </span>
      </div>

      {/* Main Headline */}
      <div className="space-y-2 px-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#dfe2f1] tracking-tight leading-snug">
          From Random Roommates to Good Friends
        </h1>
        <p className="text-sm sm:text-base text-[#ddbfc3] leading-relaxed max-w-md mx-auto">
          The milestones that turned an assigned dorm into home.
        </p>
      </div>

      {/* Unlocked Milestones Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171b26] border border-[#edc157]/30 text-xs font-semibold text-[#dfe2f1] shadow-sm">
        <ShieldCheck className="w-4 h-4 text-[#edc157]" />
        <span>8 Key Milestones Unlocked</span>
        <span className="w-2 h-2 rounded-full bg-[#edc157] animate-pulse" />
      </div>

      {/* Vertical Connected Timeline */}
      <div className="w-full relative pt-4 pb-2 text-left">
        {/* Continuous Connected Vertical Line */}
        <div className="absolute left-6 sm:left-7 top-6 bottom-8 w-[2px] bg-gradient-to-b from-[#a855f7]/60 via-[#edc157]/80 to-[#ff7597]" />

        <div className="space-y-6">
          {JOURNEY_MILESTONES.map((milestone) => {
            const isExpanded = expandedId === milestone.id;
            const isToday = milestone.id === 'today';
            const isLiked = likedMilestones[milestone.id];

            return (
              <div key={milestone.id} className="relative flex items-start gap-3 sm:gap-4 pl-1 group">
                {/* Milestone Node Icon */}
                <div
                  onClick={() => toggleExpand(milestone.id)}
                  className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all cursor-pointer shadow-md active:scale-95 ${
                    isToday
                      ? 'bg-gradient-to-tr from-[#ff7597] to-[#ffb1c0] text-[#660029] border-[#ff7597] ring-4 ring-[#ff7597]/20 shadow-[0_0_16px_rgba(255,117,151,0.5)]'
                      : 'bg-[#1c1f2a] text-[#ffb1c0] border-white/10 hover:border-[#edc157]/40 hover:bg-[#262a35]'
                  }`}
                >
                  {getMilestoneIcon(milestone.icon)}
                </div>

                {/* Milestone Card Content */}
                <div
                  onClick={() => toggleExpand(milestone.id)}
                  className={`flex-1 rounded-2xl p-4 transition-all duration-300 border cursor-pointer ${
                    isToday
                      ? 'bg-[#171b26]/95 border-[#ff7597]/40 shadow-[0_4px_24px_rgba(255,117,151,0.15)]'
                      : 'bg-[#1c1f2a]/70 hover:bg-[#1c1f2a] border-white/5 hover:border-white/10 shadow-sm'
                  }`}
                >
                  {/* Top Day Label & Expand Action */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {isToday ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#edc157] text-[#251a00] text-[10px] font-extrabold uppercase tracking-wider">
                          SPECIAL DAY
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-[#ffdf9b] uppercase tracking-wider font-mono">
                          {milestone.dayLabel}
                        </span>
                      )}

                      {isToday && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ffdf9b]">
                          <Sparkles className="w-3 h-3 text-[#edc157]" /> Today
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-[#ddbfc3] group-hover:text-[#dfe2f1]">
                      <span>{isExpanded ? 'Hide' : 'Tap to view'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#edc157]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#edc157]" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#dfe2f1] flex items-center gap-1.5 leading-snug">
                    <span>{milestone.title}</span>
                    <span>{milestone.emoji}</span>
                  </h3>

                  {/* Short description */}
                  <p className="text-xs sm:text-sm text-[#ddbfc3] mt-1 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Expandable Extended Details & Special Birthday Card */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-3 animate-in fade-in duration-300">
                      {milestone.expandedDetails && (
                        <p className="text-xs text-[#dfe2f1]/90 italic bg-[#0f131d]/60 p-2.5 rounded-xl border border-white/5">
                          "{milestone.expandedDetails}"
                        </p>
                      )}

                      {/* Special Birthday Card for Milestone 8 (Matches Image 15 perfectly) */}
                      {milestone.hasSpecialCard && (
                        <div className="rounded-2xl overflow-hidden bg-[#0f131d] border border-white/15 shadow-xl">
                          {/* Photo Banner with Cake and Candle */}
                          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                            <img
                              src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop"
                              alt="Birthday chocolate cake with candle"
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f131d] via-[#0f131d]/30 to-transparent" />

                            {/* Top chapter tag on image */}
                            <div className="absolute top-2.5 left-3 text-[10px] font-mono font-bold text-white/80 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-md">
                              05 — Our Journey
                            </div>

                            {/* Bottom badges on image */}
                            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs font-bold text-[#ffdf9b]">
                              <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                                <Sparkles className="w-3.5 h-3.5 text-[#edc157]" />
                                <span>Roommate Milestone</span>
                              </div>
                              <div className="bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md text-[#ffb1c0]">
                                100% Unlocked
                              </div>
                            </div>
                          </div>

                          {/* Heartfelt Quote & Forever Roommate Note */}
                          <div className="p-4 space-y-3">
                            <p className="font-serif italic text-sm sm:text-base text-[#ffb1c0] leading-relaxed">
                              “Here's to the guy who made a random dorm room feel like family. Happy Birthday, my brother!”
                            </p>

                            <div className="flex items-center justify-between pt-1 border-t border-white/5">
                              <span className="text-xs text-[#ddbfc3]">
                                From your forever roommate: <strong className="text-[#dfe2f1]">{config.yourName}</strong>
                              </span>
                              <button
                                type="button"
                                aria-label="Love this milestone"
                                onClick={(e) => toggleLike(e, milestone.id)}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-[#ff7597]"
                              >
                                <Heart
                                  className={`w-4 h-4 ${
                                    isLiked ? 'fill-[#ff7597] text-[#ff7597]' : 'text-[#ddbfc3]'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating CTA Pill: Ready for the Birthday Challenge? (Matches Image 15) */}
      <div className="w-full max-w-sm pt-4">
        <button
          type="button"
          onClick={onGoToChallenge}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#ff7597] via-[#ffb1c0] to-[#ff72ab] text-[#740430] font-bold text-sm tracking-wide shadow-[0_0_24px_rgba(255,117,151,0.5)] hover:shadow-[0_0_32px_rgba(255,117,151,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-white drop-shadow-sm font-bold">
            Ready for the Birthday Challenge? 🎮
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
