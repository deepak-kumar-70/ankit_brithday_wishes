/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChapterId, PersonalConfig } from './types';
import { CHAPTERS, DEFAULT_PERSONAL_CONFIG } from './data/content';
import { Header } from './components/Header';
import { ChapterDrawer } from './components/ChapterDrawer';
import { MusicPlayer } from './components/MusicPlayer';
import { BottomNav } from './components/BottomNav';
import { PersonalizerModal } from './components/PersonalizerModal';

import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { MessageScreen } from './components/screens/MessageScreen';
import { MemoriesScreen } from './components/screens/MemoriesScreen';
import { AwardsScreen } from './components/screens/AwardsScreen';
import { JourneyScreen } from './components/screens/JourneyScreen';
import { MiniGameScreen } from './components/screens/MiniGameScreen';
import { SurpriseScreen } from './components/screens/SurpriseScreen';
import { WishesScreen } from './components/screens/WishesScreen';

export default function App() {
  const [currentChapterId, setCurrentChapterId] = useState<ChapterId>('welcome');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPersonalizerOpen, setIsPersonalizerOpen] = useState(false);
  const [config, setConfig] = useState<PersonalConfig>(() => {
    const saved = localStorage.getItem('roommate_birthday_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_PERSONAL_CONFIG;
      }
    }
    return DEFAULT_PERSONAL_CONFIG;
  });

  const handleSaveConfig = (newConfig: PersonalConfig) => {
    setConfig(newConfig);
    localStorage.setItem('roommate_birthday_config', JSON.stringify(newConfig));
  };

  const currentChapterIndex = CHAPTERS.findIndex((c) => c.id === currentChapterId);
  const currentChapter = CHAPTERS[currentChapterIndex] || CHAPTERS[0];

  const handleNext = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      setCurrentChapterId(CHAPTERS[currentChapterIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterId(CHAPTERS[currentChapterIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectChapter = (id: ChapterId) => {
    setCurrentChapterId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0f131d] text-[#dfe2f1] font-sans antialiased min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#ff7597] selection:text-[#740430]">
      {/* Ambient Nocturnal Backdrops & Glow Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-[#ff7597]/15 blur-[95px]" />
        <div className="absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-[#edc157]/10 blur-[100px]" />
        <div className="absolute -bottom-24 left-1/4 w-88 h-88 rounded-full bg-[#ff72ab]/10 blur-[90px]" />
      </div>

      {/* Top Header */}
      <Header
        currentChapterId={currentChapterId}
        currentChapterTitle={currentChapter.title}
        onOpenChapters={() => setIsDrawerOpen(true)}
        onOpenPersonalizer={() => setIsPersonalizerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-32 px-4 sm:px-6 z-10 max-w-3xl mx-auto">
        {currentChapterId === 'welcome' && (
          <WelcomeScreen
            config={config}
            onStartJourney={() => handleSelectChapter('journey')}
          />
        )}

        {currentChapterId === 'message' && (
          <MessageScreen
            config={config}
            onNext={() => handleSelectChapter('memories')}
          />
        )}

        {currentChapterId === 'memories' && (
          <MemoriesScreen
            config={config}
            onNext={() => handleSelectChapter('roommate')}
          />
        )}

        {currentChapterId === 'roommate' && (
          <AwardsScreen
            config={config}
            onNext={() => handleSelectChapter('journey')}
          />
        )}

        {currentChapterId === 'journey' && (
          <JourneyScreen
            config={config}
            onGoToChallenge={() => handleSelectChapter('mini-game')}
          />
        )}

        {currentChapterId === 'mini-game' && (
          <MiniGameScreen
            config={config}
            onUnlockPrize={() => handleSelectChapter('big-surprise')}
            onBack={() => handleSelectChapter('journey')}
          />
        )}

        {currentChapterId === 'big-surprise' && (
          <SurpriseScreen
            config={config}
            onNext={() => handleSelectChapter('final-wishes')}
          />
        )}

        {currentChapterId === 'final-wishes' && (
          <WishesScreen
            config={config}
            onRestart={() => handleSelectChapter('welcome')}
          />
        )}
      </main>

      {/* Floating Vinyl Soundtrack Player */}
      <MusicPlayer />

      {/* Bottom Sticky Navigation */}
      <BottomNav
        currentChapterId={currentChapterId}
        onSelectChapter={handleSelectChapter}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Chapter Drawer */}
      <ChapterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentChapterId={currentChapterId}
        onSelectChapter={handleSelectChapter}
      />

      {/* Personalizer Modal */}
      <PersonalizerModal
        isOpen={isPersonalizerOpen}
        onClose={() => setIsPersonalizerOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
