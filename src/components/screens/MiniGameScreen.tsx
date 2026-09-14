import React, { useState, useEffect } from 'react';
import { SYNERGY_QUESTIONS } from '../../data/content';
import { PersonalConfig } from '../../types';
import { soundEngine } from '../../utils/audio';
import {
  Sparkles,
  Award,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Volume2,
  VolumeX,
  Camera,
  Music,
  Gift
} from 'lucide-react';

interface MiniGameScreenProps {
  config: PersonalConfig;
  onUnlockPrize: () => void;
  onBack: () => void;
}

interface MemoryCard {
  id: number;
  emoji: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const INITIAL_CARDS = [
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '☕', name: 'Coffee' },
  { emoji: '🍜', name: 'Noodles' },
  { emoji: '🎮', name: 'Gaming' },
  { emoji: '🔑', name: 'Dorm Key' },
  { emoji: '🎂', name: 'Cake' },
];

export const MiniGameScreen: React.FC<MiniGameScreenProps> = ({
  config,
  onUnlockPrize,
}) => {
  const [activeTab, setActiveTab] = useState<'match' | 'quiz'>('match');

  // Memory Match State
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [matchScore, setMatchScore] = useState(0);

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  // Audio pill state
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  // Initialize Memory Cards
  const setupGame = () => {
    const deck = [...INITIAL_CARDS, ...INITIAL_CARDS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        emoji: item.emoji,
        name: item.name,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setSelectedCards([]);
    setMatchedPairs(0);
  };

  useEffect(() => {
    setupGame();
  }, []);

  // Card click handler
  const handleCardClick = (index: number) => {
    if (
      cards[index].isFlipped ||
      cards[index].isMatched ||
      selectedCards.length === 2
    ) {
      return;
    }

    soundEngine.playChime();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [firstIdx, secondIdx] = newSelected;
      if (cards[firstIdx].emoji === cards[secondIdx].emoji) {
        // Matched!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setSelectedCards([]);
          setMatchedPairs((prev) => {
            const next = prev + 1;
            if (next === INITIAL_CARDS.length) {
              soundEngine.playSuccessSound();
              setMatchScore(50);
            }
            return next;
          });
        }, 500);
      } else {
        // No match, flip back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  // Quiz Option Click
  const handleQuizAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const isCorrect = optionIdx === SYNERGY_QUESTIONS[currentQIndex].correct;
    if (isCorrect) {
      soundEngine.playSuccessSound();
      setQuizScore((prev) => prev + 12.5);
    } else {
      soundEngine.playBlowSound();
      setQuizScore((prev) => prev + 5); // Participation points
    }

    setTimeout(() => {
      if (currentQIndex < SYNERGY_QUESTIONS.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setQuizDone(true);
      }
    }, 1400);
  };

  // Synergy Score calculation (max 100%)
  const rawScore = (matchedPairs / INITIAL_CARDS.length) * 50 + (quizDone ? 50 : (currentQIndex / SYNERGY_QUESTIONS.length) * 50);
  const synergyPercent = Math.min(100, Math.round(rawScore));
  const isUnlocked = synergyPercent >= 75 || (matchedPairs === INITIAL_CARDS.length && quizDone);

  const toggleMuteAudio = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center space-y-4 pb-12 pt-2 text-left">
      {/* Subtitle instructions matching Image 13 */}
      <p className="text-sm text-[#dfe2f1]/90 text-center px-4 leading-relaxed font-medium">
        Let's see if our memories match up before you unlock the grand prize.
      </p>

      {/* Roommate Synergy Score Card (Matches Image 13) */}
      <div className="w-full rounded-2xl bg-[#171b26]/90 border border-white/10 p-4 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#906d00] to-[#edc157] flex items-center justify-center text-[#251a00] shadow-[0_0_12px_rgba(237,193,87,0.4)]">
            <Award className="w-5 h-5 text-[#251a00]" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#dfe2f1] leading-tight">
              Roommate Synergy
            </h3>
            <span className="text-xs font-mono text-[#edc157] font-semibold">
              {synergyPercent}% Sync
            </span>
          </div>
        </div>

        {/* Horizontal Progress bar */}
        <div className="w-32 h-2.5 rounded-full bg-[#313540] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#edc157] to-[#ff7597] transition-all duration-500 rounded-full"
            style={{ width: `${synergyPercent}%` }}
          />
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="w-full flex rounded-xl bg-[#1c1f2a] p-1 border border-white/10 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('match')}
          className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'match'
              ? 'bg-[#ff7597] text-[#660029] font-bold shadow-md'
              : 'text-[#ddbfc3] hover:text-[#dfe2f1]'
          }`}
        >
          <span>Memory Match</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
            {matchedPairs}/{INITIAL_CARDS.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-[#ff7597] text-[#660029] font-bold shadow-md'
              : 'text-[#ddbfc3] hover:text-[#dfe2f1]'
          }`}
        >
          <span>Roommate Trivia</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
            {quizDone ? 'Done' : `${currentQIndex + 1}/4`}
          </span>
        </button>
      </div>

      {/* Main Interactive Game Board */}
      {activeTab === 'match' ? (
        <div className="w-full rounded-2xl bg-[#171b26]/70 border border-white/10 p-4 space-y-3 shadow-inner">
          <div className="flex items-center justify-between text-xs text-[#ddbfc3]">
            <span>Tap cards to find matching roommate icons</span>
            <button
              type="button"
              onClick={setupGame}
              className="text-[#edc157] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* 4x3 Card Grid */}
          <div className="grid grid-cols-4 gap-2.5 pt-1">
            {cards.map((card, index) => {
              const isOpen = card.isFlipped || card.isMatched;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(index)}
                  className={`h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 border cursor-pointer select-none ${
                    isOpen
                      ? 'bg-gradient-to-tr from-[#262a35] to-[#313540] border-[#edc157]/50 shadow-[0_0_12px_rgba(237,193,87,0.2)] rotate-y-180'
                      : 'bg-[#1c1f2a] border-white/10 hover:border-[#ff7597]/40 hover:bg-[#262a35]'
                  }`}
                >
                  {isOpen ? (
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-1">{card.emoji}</span>
                      <span className="text-[9px] font-semibold text-[#dfe2f1] truncate px-1">
                        {card.name}
                      </span>
                    </div>
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#ffb1c0]/40" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Trivia Mode */
        <div className="w-full rounded-2xl bg-[#171b26]/70 border border-white/10 p-4 space-y-3.5 shadow-inner">
          {!quizDone ? (
            <>
              <div className="flex items-center justify-between text-xs text-[#edc157] font-semibold">
                <span>QUESTION {currentQIndex + 1} OF 4</span>
                <HelpCircle className="w-4 h-4" />
              </div>

              <h4 className="text-sm sm:text-base font-bold text-[#dfe2f1] leading-snug">
                {SYNERGY_QUESTIONS[currentQIndex].question}
              </h4>

              <div className="space-y-2 pt-1">
                {SYNERGY_QUESTIONS[currentQIndex].options.map((option, idx) => {
                  const isChosen = selectedOption === idx;
                  const isAnswer = idx === SYNERGY_QUESTIONS[currentQIndex].correct;

                  let btnStyle = 'bg-[#1c1f2a] hover:bg-[#262a35] border-white/10 text-[#dfe2f1]';
                  if (selectedOption !== null) {
                    if (isAnswer) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={selectedOption !== null}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${btnStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <p className="text-xs text-[#ffdf9b] italic animate-in fade-in pt-1">
                  💡 {SYNERGY_QUESTIONS[currentQIndex].commentary}
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#edc157] mx-auto animate-bounce" />
              <h4 className="font-bold text-[#dfe2f1]">Trivia Mastered!</h4>
              <p className="text-xs text-[#ddbfc3]">
                Your roommate synergy is legendary. {config.roommateName} and {config.yourName} are in total sync!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Archive Keepsake Photo Card (Matches Image 13) */}
      <div className="w-full rounded-2xl overflow-hidden bg-[#171b26]/90 border border-white/10 shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJeCZGVqrK5SM9IfGRELAytQwUzmOxl7xcnb-xJjnSWPfFuP3y5fPB723Y4eWR0DPa2xW1x-HHnp46klZzLWfRLbwR9FSf_nJ_24ndZpTyLKRBClbx0V6nXvidVcWbIfi8u6j2F7Ihen5a_rgLFdG_d1IqqK-r4BU1e8iogwMQ706MciXA7ZPG2MzI5ETjQATOn_l7qDyKPETUw1GrwK5N9K_kPZk4VWkM0NOUefDKjuCKEtJV4ML6"
            alt="Roommates eating pizza at midnight"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171b26] via-transparent to-black/30" />

          {/* Bottom tag over image (Matches Image 13) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs font-semibold text-[#dfe2f1] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Camera className="w-3.5 h-3.5 text-[#edc157]" />
            <span className="truncate">
              Archive: 700+ Hours of Midnight Shenanigans
            </span>
          </div>
        </div>
      </div>

      {/* Soundtrack Pill (Matches Image 13) */}
      <div className="w-full rounded-2xl bg-[#1c1f2a]/80 border border-white/10 p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#ff7597]/20 flex items-center justify-center text-[#ff7597]">
            <Music className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-[#edc157] uppercase">
              SOUNDTRACK
            </span>
            <span className="text-xs text-[#dfe2f1] font-medium">
              Late Night Dorm Room Vibes • Lo-fi
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleMuteAudio}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#ddbfc3] hover:text-[#dfe2f1] bg-white/5 active:scale-95"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#ff7597]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#edc157]" />
          )}
        </button>
      </div>

      {/* Unlock Grand Prize Button */}
      <div className="w-full pt-2">
        <button
          type="button"
          onClick={onUnlockPrize}
          className={`w-full py-4 px-6 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
            isUnlocked
              ? 'bg-gradient-to-r from-[#ff7597] via-[#edc157] to-[#ff72ab] text-[#660029] shadow-[0_0_24px_rgba(255,117,151,0.6)] animate-pulse'
              : 'bg-gradient-to-r from-[#ff7597] to-[#edc157] text-[#660029]'
          }`}
        >
          <Gift className="w-4 h-4 text-white" />
          <span className="text-white drop-shadow-sm font-bold">
            {isUnlocked ? 'Synergy Complete! Unlock Grand Prize 🎁' : 'Unlock the Grand Prize 🎁'}
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
