import React, { useState, useEffect, useRef } from 'react';
import { PersonalConfig } from '../../types';
import { soundEngine } from '../../utils/audio';
import { Sparkles, Heart, Flame, Wind, ArrowRight, Coffee, Smile, Moon, Camera, CheckCircle2 } from 'lucide-react';

interface WelcomeScreenProps {
  config: PersonalConfig;
  onStartJourney: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ config, onStartJourney }) => {
  const [isBlown, setIsBlown] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background floating ambient stardust particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#ffb1c0', '#edc157', '#ffd9df', '#ff72ab', '#ffffff'];
    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: -(Math.random() * 0.4 + 0.15),
      vx: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      pulsing: Math.random() * 0.03 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        p.alpha += Math.sin(Date.now() * p.pulsing) * 0.008;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCandleInteraction = () => {
    if (!isBlown) {
      // Extinguish
      setIsBlown(true);
      setWishCount((prev) => prev + 1);
      soundEngine.playBlowSound();
      setTimeout(() => {
        soundEngine.playSuccessSound();
      }, 300);
    } else {
      // Relight
      setIsBlown(false);
      soundEngine.playChime();
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center text-center space-y-5 pb-8 pt-2">
      {/* Ambient Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-75 w-full h-full"
      />

      {/* Top Tagline Pill */}
      <div className="relative z-10 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1c1f2a]/70 backdrop-blur-xl border border-white/10 shadow-md">
        <Sparkles className="w-3.5 h-3.5 text-[#edc157]" />
        <span className="text-[11px] font-bold text-[#ffdf9b] tracking-widest uppercase">
          A Special Gift Just For You
        </span>
        <Heart className="w-3.5 h-3.5 text-[#ff7597] fill-[#ff7597]" />
      </div>

      {/* Main Celebratory Heading */}
      <div className="relative z-10 space-y-1.5 px-2 max-w-xl">
        <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffdf9b] via-[#ffb1c0] to-[#edc157] font-bold tracking-tight drop-shadow-sm leading-tight">
          🎉 Happy Birthday,{' '}
          <span className="text-[#dfe2f1] underline decoration-[#ff7597] decoration-wavy decoration-2 underline-offset-4">
            {config.roommateName}
          </span>
          ! 🎂
        </h1>
        <p className="font-serif text-lg sm:text-xl text-[#ddbfc3] font-medium italic">
          Today isn't just another day... it's your day. ❤️
        </p>
      </div>

      {/* Centerpiece: Interactive Magical Birthday Cake Stage */}
      <div className="relative z-10 w-full max-w-xs mx-auto py-2 flex flex-col items-center">
        {/* Floating Balloons Backdrop */}
        <div
          className="absolute -top-1 left-3 w-9 h-13 rounded-full bg-[#ff7597]/25 blur-[1px] animate-bounce pointer-events-none"
          style={{ animationDuration: '4.5s' }}
        />
        <div
          className="absolute top-4 right-4 w-8 h-12 rounded-full bg-[#edc157]/25 blur-[1px] animate-bounce pointer-events-none"
          style={{ animationDuration: '3.8s', animationDelay: '0.8s' }}
        />

        {/* Wish Status Indicator Banner */}
        <div
          className={`mb-3 px-3.5 py-1 rounded-full backdrop-blur-md transition-all duration-500 shadow-sm flex items-center gap-1.5 ${
            isBlown
              ? 'bg-[#ff7597]/20 border border-[#ff7597]/50 text-[#ffb1c0]'
              : 'bg-[#262a35]/80 border border-white/10 text-[#ffdf9b]'
          }`}
        >
          <Sparkles
            className={`w-4 h-4 ${
              isBlown ? 'text-[#ff7597] animate-spin' : 'text-[#edc157] animate-pulse'
            }`}
          />
          <span className="text-xs font-semibold uppercase tracking-wider">
            {isBlown ? 'Wish made! May it all come true! ✨' : 'Tap the flame to blow candle'}
          </span>
        </div>

        {/* SVG Cake Interactive Zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Interactive Birthday Cake"
          onClick={handleCandleInteraction}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleCandleInteraction();
          }}
          className="relative cursor-pointer select-none group focus:outline-none"
        >
          {/* Flame Halo/Aura */}
          <div
            className={`absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#edc157]/25 rounded-full blur-xl pointer-events-none transition-opacity duration-700 ${
              isBlown ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* SVG Animated Cake */}
          <svg
            className="w-64 h-64 overflow-visible drop-shadow-2xl"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="frostingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffb1c0" />
                <stop offset="100%" stopColor="#ff7597" />
              </linearGradient>
              <linearGradient id="spongeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#262a35" />
                <stop offset="100%" stopColor="#1c1f2a" />
              </linearGradient>
              <linearGradient id="goldPlate" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#edc157" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ffdf9b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#906d00" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id="flameInner" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#ffdf9b" />
                <stop offset="85%" stopColor="#ff7597" />
                <stop offset="100%" stopColor="#740430" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Gold Pedestal Base */}
            <ellipse cx="120" cy="216" rx="94" ry="12" fill="url(#goldPlate)" />
            <ellipse cx="120" cy="214" rx="86" ry="8" fill="#171b26" opacity="0.8" />

            {/* Bottom Tier */}
            <rect x="42" y="152" width="156" height="54" rx="14" fill="url(#spongeGrad)" />
            <path
              d="M42 166 C55 174, 65 174, 78 166 C91 158, 101 158, 114 166 C127 174, 137 174, 150 166 C163 158, 173 158, 198 166 L198 152 L42 152 Z"
              fill="url(#frostingGrad)"
              opacity="0.95"
            />
            <circle cx="68" cy="184" r="3.5" fill="#edc157" opacity="0.85" />
            <circle cx="120" cy="186" r="3.5" fill="#ffb1c0" opacity="0.85" />
            <circle cx="172" cy="184" r="3.5" fill="#edc157" opacity="0.85" />

            {/* Mid Tier */}
            <rect x="64" y="112" width="112" height="42" rx="12" fill="url(#spongeGrad)" />
            <path
              d="M64 124 C74 130, 82 130, 92 124 C102 118, 110 118, 120 124 C130 130, 138 130, 148 124 C158 118, 166 120, 176 125 L176 112 L64 112 Z"
              fill="url(#frostingGrad)"
            />
            <circle cx="86" cy="138" r="2.5" fill="#ffdf9b" />
            <circle cx="120" cy="140" r="2.5" fill="#ffb0cb" />
            <circle cx="154" cy="138" r="2.5" fill="#ffdf9b" />

            {/* Top Tier */}
            <rect x="84" y="78" width="72" height="36" rx="10" fill="url(#spongeGrad)" />
            <path
              d="M84 88 C92 93, 98 93, 106 88 C114 83, 120 83, 128 88 C136 93, 142 93, 156 87 L156 78 L84 78 Z"
              fill="url(#frostingGrad)"
            />

            {/* Golden Birthday Candle */}
            <rect x="116" y="48" width="8" height="32" rx="3" fill="#ffdf9b" />
            <path
              d="M116 54 L124 58 M116 62 L124 66 M116 70 L124 74"
              stroke="#906d00"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <line x1="120" y1="48" x2="120" y2="40" stroke="#313540" strokeWidth="2" strokeLinecap="round" />

            {/* Animated Flickering Flame Group */}
            {!isBlown ? (
              <g className="transition-all duration-300">
                <path
                  d="M120 18 C126 26, 129 32, 125 38 C122 43, 118 43, 115 38 C111 32, 114 26, 120 18 Z"
                  fill="url(#flameInner)"
                  className="origin-bottom"
                >
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="1 1; 1.08 1.15; 0.94 1.05; 1.04 0.96; 1 1"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 120 38; -3 120 38; 4 120 38; -2 120 38; 0 120 38"
                    dur="1.8s"
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </path>
                <ellipse cx="120" cy="33" rx="2.5" ry="5.5" fill="#FFFFFF" opacity="0.95">
                  <animate
                    attributeName="opacity"
                    values="0.95; 0.7; 1; 0.85; 0.95"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </ellipse>
              </g>
            ) : (
              /* Smoke wisps when extinguished */
              <g className="animate-in fade-in duration-500">
                <path
                  d="M120 38 Q115 28 123 20 T118 6"
                  fill="none"
                  stroke="#dfe2f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <circle cx="120" cy="34" r="1.5" fill="#edc157" opacity="0.7" />
              </g>
            )}
          </svg>

          {/* Pulse ring target */}
          {!isBlown && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-[#edc157]/40 animate-ping pointer-events-none" />
          )}
        </div>

        {/* Action button helper */}
        <button
          type="button"
          onClick={handleCandleInteraction}
          className="mt-1 text-xs font-semibold text-[#ddbfc3] hover:text-[#edc157] transition-colors flex items-center gap-1 py-1 px-3 rounded-full hover:bg-white/5"
        >
          {isBlown ? (
            <>
              <span>Relight candle</span>
              <Flame className="w-3.5 h-3.5 text-[#ff7597]" />
            </>
          ) : (
            <>
              <span>Click candle to blow out flame</span>
              <Wind className="w-3.5 h-3.5 text-[#edc157]" />
            </>
          )}
        </button>
      </div>

      {/* Keepsake Photo Frame of Roommate Bond */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl overflow-hidden bg-[#171b26]/90 backdrop-blur-xl border border-white/10 shadow-xl text-left">
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJeCZGVqrK5SM9IfGRELAytQwUzmOxl7xcnb-xJjnSWPfFuP3y5fPB723Y4eWR0DPa2xW1x-HHnp46klZzLWfRLbwR9FSf_nJ_24ndZpTyLKRBClbx0V6nXvidVcWbIfi8u6j2F7Ihen5a_rgLFdG_d1IqqK-r4BU1e8iogwMQ706MciXA7ZPG2MzI5ETjQATOn_l7qDyKPETUw1GrwK5N9K_kPZk4VWkM0NOUefDKjuCKEtJV4ML6"
            alt="Roommate celebratory candid photo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171b26] via-[#171b26]/30 to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#313540]/80 backdrop-blur-md border border-white/10">
            <Camera className="w-3.5 h-3.5 text-[#edc157]" />
            <span className="text-[10px] font-bold text-[#ffdf9b]">
              Roommate Memory № 01
            </span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#edc157] uppercase tracking-wider">
              Dedication Note
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#ff7597]" />
          </div>

          <p className="text-sm text-[#dfe2f1] leading-relaxed">
            Customized for{' '}
            <span className="font-semibold text-[#ffb1c0]">
              {config.roommateName}
            </span>{' '}
            with midnight mischief, unforgettable memories, and unreserved love.
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-[#ddbfc3] border-t border-white/5">
            <span className="italic">With love, from your favorite roommate:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ff7597]/20 text-[#ffb1c0] font-bold">
              {config.yourName}
            </span>
          </div>
        </div>
      </div>

      {/* Roommate Little Milestones Strip */}
      <div className="relative z-10 w-full max-w-sm grid grid-cols-3 gap-2 pt-1">
        <div className="p-3 rounded-xl bg-[#1c1f2a]/70 backdrop-blur-md border border-white/10 text-center">
          <Coffee className="w-5 h-5 text-[#edc157] mx-auto mb-1" />
          <div className="text-lg font-bold text-[#dfe2f1]">1,000+</div>
          <div className="text-[11px] text-[#ddbfc3] truncate">Shared Coffees</div>
        </div>
        <div className="p-3 rounded-xl bg-[#1c1f2a]/70 backdrop-blur-md border border-white/10 text-center">
          <Smile className="w-5 h-5 text-[#ff7597] mx-auto mb-1" />
          <div className="text-lg font-bold text-[#dfe2f1]">∞</div>
          <div className="text-[11px] text-[#ddbfc3] truncate">Inside Jokes</div>
        </div>
        <div className="p-3 rounded-xl bg-[#1c1f2a]/70 backdrop-blur-md border border-white/10 text-center">
          <Moon className="w-5 h-5 text-[#ffb0cb] mx-auto mb-1" />
          <div className="text-lg font-bold text-[#dfe2f1]">3:00 AM</div>
          <div className="text-[11px] text-[#ddbfc3] truncate">Deep Talks</div>
        </div>
      </div>

      {/* Primary Call to Action */}
      <div className="relative z-10 w-full max-w-sm pt-2 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onStartJourney}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#ff7597] via-[#ffb1c0] to-[#edc157] text-[#660029] text-xs uppercase tracking-wider font-bold shadow-[0_0_28px_rgba(255,117,151,0.45)] hover:shadow-[0_0_36px_rgba(237,193,87,0.6)] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-white drop-shadow-sm font-bold">
            Start the Birthday Surprise
          </span>
          <Sparkles className="w-4 h-4 text-white" />
        </button>

        <div className="flex items-center gap-1 text-[11px] text-[#ddbfc3] pt-1">
          <Sparkles className="w-3 h-3 text-[#edc157]" />
          <span>Pro-tip: Tap play on the music disk below for background magic 🎶</span>
        </div>
      </div>
    </div>
  );
};
