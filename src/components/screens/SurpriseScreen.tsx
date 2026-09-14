import React, { useState } from 'react';
import { PersonalConfig } from '../../types';
import { soundEngine } from '../../utils/audio';
import { Gift, Sparkles, Heart, ArrowRight, Check, PartyPopper } from 'lucide-react';

interface SurpriseScreenProps {
  config: PersonalConfig;
  onNext: () => void;
}

export const SurpriseScreen: React.FC<SurpriseScreenProps> = ({ config, onNext }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleOpenGift = () => {
    if (!isOpened) {
      setIsOpened(true);
      soundEngine.playSuccessSound();
    }
  };

  const handleScratch = () => {
    if (!isScratched) {
      setIsScratched(true);
      soundEngine.playChime();
    }
  };

  const handleClaim = () => {
    setClaimed(true);
    soundEngine.playSuccessSound();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-5 pb-12 pt-2 text-center">
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1f2a]/90 backdrop-blur-md border border-white/10 shadow-sm">
        <Gift className="w-3.5 h-3.5 text-[#ff72ab]" />
        <span className="text-[11px] font-bold text-[#ffdf9b] uppercase tracking-widest">
          CHAPTER 07 • THE GRAND SURPRISE
        </span>
      </div>

      <div className="space-y-1.5 px-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#dfe2f1]">
          The Roommate Grand Prize
        </h1>
        <p className="text-xs sm:text-sm text-[#ddbfc3]">
          You unlocked the synergy milestone! Tap the parcel to reveal your birthday bounty.
        </p>
      </div>

      {/* Gift Box Stage */}
      {!isOpened ? (
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpenGift}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenGift();
          }}
          className="w-full max-w-xs py-10 px-6 rounded-3xl bg-[#171b26]/95 border border-[#edc157]/40 shadow-2xl flex flex-col items-center justify-center space-y-5 cursor-pointer hover:border-[#ff7597] hover:scale-105 active:scale-95 transition-all group select-none relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#ff7597]/20 to-transparent pointer-events-none" />

          {/* Animated 3D Gift Box Graphic */}
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#ff7597] to-[#740430] border-2 border-[#edc157] shadow-[0_0_30px_rgba(255,117,151,0.5)] flex items-center justify-center group-hover:rotate-3 transition-transform">
              {/* Ribbon Straps */}
              <div className="absolute inset-y-0 w-6 bg-[#edc157] shadow-sm" />
              <div className="absolute inset-x-0 h-6 bg-[#edc157] shadow-sm" />

              {/* Bow on Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5">
                <div className="w-7 h-7 rounded-full border-4 border-[#edc157] -rotate-45 shadow-sm" />
                <div className="w-7 h-7 rounded-full border-4 border-[#edc157] rotate-45 shadow-sm" />
              </div>

              <Sparkles className="w-8 h-8 text-white relative z-10 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1 relative z-10">
            <span className="text-xs font-mono font-bold text-[#ffdf9b] uppercase tracking-wider">
              Tied with Golden Bow
            </span>
            <h3 className="font-serif text-lg font-bold text-[#dfe2f1]">
              Tap Box to Untie Ribbon
            </h3>
          </div>

          <span className="text-[11px] text-[#ffb1c0] bg-white/5 px-3 py-1 rounded-full border border-white/10 relative z-10">
            Guaranteed 100% No Boring Socks
          </span>
        </div>
      ) : (
        /* Unboxed Surprise Card */
        <div className="w-full rounded-3xl bg-[#171b26] border border-[#edc157]/40 p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-500 text-left relative overflow-hidden">
          {/* Top Header Badge */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <PartyPopper className="w-5 h-5 text-[#edc157]" />
              <span className="font-mono text-xs font-bold text-[#ffdf9b] uppercase tracking-wider">
                Official Roommate Birthday Voucher
              </span>
            </div>
            <span className="text-xs text-[#ff7597] font-bold">VIP Tier</span>
          </div>

          {/* Golden Certificate */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#262a35] to-[#1c1f2a] border border-[#edc157]/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#edc157]">
                ROOMMATE IMMUNITY PASS
              </span>
              <span className="text-xs text-[#ddbfc3]">Valid for 1 Full Year</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#dfe2f1] leading-tight">
              Awarded to <span className="text-[#ffb1c0]">{config.roommateName}</span>
            </h3>

            {/* Privileges Checklist */}
            <div className="space-y-2 text-xs sm:text-sm text-[#dfe2f1] pt-1">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#edc157] shrink-0 mt-0.5" />
                <span>
                  <strong>1-Month Dish Exemption:</strong> {config.yourName} will do the dishes with zero complaints.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#edc157] shrink-0 mt-0.5" />
                <span>
                  <strong>Midnight Pizza Treat:</strong> 3 emergency pizza or ramen deliveries funded on-demand.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#edc157] shrink-0 mt-0.5" />
                <span>
                  <strong>Aux Cord Monarchy:</strong> Total music freedom in the dorm for all upcoming roadtrips.
                </span>
              </div>
            </div>

            {/* Scratch to Reveal Secret Code */}
            <div className="pt-3">
              <span className="text-[11px] text-[#ddbfc3] block mb-1">
                Scratch to reveal Secret Birthday Roomie Code:
              </span>
              <div
                role="button"
                tabIndex={0}
                onClick={handleScratch}
                className="w-full p-3 rounded-xl bg-[#0f131d] border border-dashed border-[#edc157]/50 text-center cursor-pointer hover:bg-black/80 transition-colors"
              >
                {!isScratched ? (
                  <span className="text-xs font-mono font-bold text-[#edc157] animate-pulse">
                    ✨ TAP TO SCRATCH CARD ✨
                  </span>
                ) : (
                  <div className="space-y-0.5 animate-in fade-in">
                    <span className="font-mono text-sm font-bold text-[#34d399] tracking-widest">
                      ROOMIE-BROTHER-FOR-LIFE-2026
                    </span>
                    <span className="text-[10px] text-[#ddbfc3] block">
                      Redeemable at {config.dormNumber} anytime, forever.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action to Claim */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={handleClaim}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                claimed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#ff7597] to-[#edc157] text-[#660029] shadow-md hover:shadow-lg'
              }`}
            >
              <Check className="w-4 h-4 text-white" />
              <span className="text-white">
                {claimed ? 'Voucher Claimed! ✅' : 'Claim Birthday Voucher'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Action to proceed */}
      <div className="w-full max-w-sm pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-6 rounded-full bg-[#262a35] hover:bg-[#313540] border border-white/10 text-[#dfe2f1] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Final Chapter: Wishes & Stars</span>
          <ArrowRight className="w-4 h-4 text-[#edc157]" />
        </button>
      </div>
    </div>
  );
};
