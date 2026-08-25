import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { REASONS_I_LOVE_YOU } from '../data/initialData';
import { 
  Mail, 
  Heart, 
  Sparkles, 
  X, 
  Sun, 
  Flame, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  RefreshCw,
  Gift
} from 'lucide-react';
import { triggerHeartConfetti, triggerBirthdayFireworks } from '../utils/confetti';
import { playPop, playChime } from '../utils/sound';

export const LoveLetters = () => {
  const { letters, settings } = useSite();
  const [selectedLetter, setSelectedLetter] = useState(null);
  
  // Desktop grid state
  const [desktopRevealedReasons, setDesktopRevealedReasons] = useState({});

  // Mobile Sequential Progressive Reveal State
  const [mobileReasonIndex, setMobileReasonIndex] = useState(0);
  const [isMobileReasonRevealed, setIsMobileReasonRevealed] = useState(false);
  const [readTimer, setReadTimer] = useState(5);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [allReasonsCompleted, setAllReasonsCompleted] = useState(false);

  const timerIntervalRef = useRef(null);

  // 5-second countdown timer after revealing on mobile
  useEffect(() => {
    if (isTimerRunning && readTimer > 0) {
      timerIntervalRef.current = setInterval(() => {
        setReadTimer((prev) => prev - 1);
      }, 1000);
    } else if (readTimer === 0 && isTimerRunning) {
      clearInterval(timerIntervalRef.current);
      setIsTimerRunning(false);
      // Automatically unlock next reason or complete
      handleAutoAdvance();
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, readTimer]);

  const handleOpenLetter = (letter) => {
    playChime();
    triggerHeartConfetti();
    setSelectedLetter(letter);
  };

  const toggleDesktopReason = (index) => {
    playPop();
    setDesktopRevealedReasons(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Mobile Progressive Reveal Handler
  const handleRevealMobileReason = () => {
    if (isMobileReasonRevealed) return;
    playChime();
    triggerHeartConfetti();
    setIsMobileReasonRevealed(true);
    setReadTimer(5);
    setIsTimerRunning(true);

    if (mobileReasonIndex === REASONS_I_LOVE_YOU.length - 1) {
      setTimeout(() => {
        triggerBirthdayFireworks();
        setAllReasonsCompleted(true);
      }, 800);
    }
  };

  const handleAutoAdvance = () => {
    if (mobileReasonIndex < REASONS_I_LOVE_YOU.length - 1) {
      setMobileReasonIndex((prev) => prev + 1);
      setUnlockedCount((prev) => Math.max(prev, mobileReasonIndex + 2));
      setIsMobileReasonRevealed(false);
      setReadTimer(5);
      setIsTimerRunning(false);
    } else {
      setAllReasonsCompleted(true);
    }
  };

  const handleNextMobileReason = () => {
    clearInterval(timerIntervalRef.current);
    playPop();
    if (mobileReasonIndex < REASONS_I_LOVE_YOU.length - 1) {
      setMobileReasonIndex((prev) => prev + 1);
      setUnlockedCount((prev) => Math.max(prev, mobileReasonIndex + 2));
      setIsMobileReasonRevealed(false);
      setReadTimer(5);
      setIsTimerRunning(false);
    } else {
      setAllReasonsCompleted(true);
    }
  };

  const handleJumpToMobileReason = (index) => {
    if (index < unlockedCount) {
      clearInterval(timerIntervalRef.current);
      playPop();
      setMobileReasonIndex(index);
      setIsMobileReasonRevealed(true);
      setReadTimer(5);
      setIsTimerRunning(false);
    }
  };

  const handleResetMobileJourney = () => {
    clearInterval(timerIntervalRef.current);
    playPop();
    setMobileReasonIndex(0);
    setIsMobileReasonRevealed(false);
    setReadTimer(5);
    setIsTimerRunning(false);
    setUnlockedCount(1);
    setAllReasonsCompleted(false);
  };

  const getLetterIcon = (icon) => {
    switch (icon) {
      case 'Sun': return <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
      case 'Heart': return <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500" />;
      case 'Flame': return <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />;
      default: return <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />;
    }
  };

  return (
    <section id="letters" className="py-8 sm:py-14 px-3 sm:px-4 relative bg-gradient-to-b from-rose-50/30 to-pink-100/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-2">
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            <span>Sealed With Infinite Love</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800 font-serif-romantic mb-1.5 sm:mb-2">
            Love Letters & Reasons Why 💌
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base">
            Click on any envelope to unseal a personalized love letter written just for you.
          </p>
        </div>

        {/* 'Open When...' Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-6 sm:mb-10">
          {letters.map((letter) => (
            <div
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              className="group glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white cursor-pointer relative flex flex-col justify-between"
            >
              {/* Envelope flap top stripe */}
              <div className="absolute top-0 inset-x-0 h-1.5 sm:h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-t-2xl sm:rounded-t-3xl opacity-80 group-hover:opacity-100" />

              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3 mt-1">
                  <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-100 group-hover:scale-110 transition-transform">
                    {getLetterIcon(letter.icon)}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-rose-600 px-2 py-0.5 rounded-full bg-rose-50">
                    {letter.badge}
                  </span>
                </div>

                <h3 className="font-serif-romantic font-bold text-sm sm:text-base text-slate-800 mb-1 sm:mb-1.5 group-hover:text-rose-600 transition-colors leading-snug">
                  {letter.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-2.5 sm:mb-3">
                  {letter.preview}
                </p>
              </div>

              <div className="pt-2 sm:pt-2.5 border-t border-rose-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                <span>Unseal Letter</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Master Birthday & 1-Year Letter Banner */}
        <div className="mb-6 sm:mb-10 glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-white max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-300/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 mb-3.5 sm:mb-4 pb-3.5 sm:pb-4 border-b border-rose-100 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white text-lg sm:text-2xl shadow-lg shrink-0">
              💌
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold font-serif-romantic text-slate-800 leading-snug">
                To My Birthday Queen, {settings.partnerName}
              </h3>
              <p className="text-xs sm:text-sm text-rose-600 font-semibold mt-0.5">
                A Letter Celebrating You & Our 1 Year Together
              </p>
            </div>
          </div>

          <div className="prose prose-rose max-w-none text-slate-700 font-serif-romantic text-xs sm:text-base leading-relaxed whitespace-pre-line italic mb-4 sm:mb-5">
            {settings.specialLetter}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2.5 sm:pt-3 border-t border-rose-100 text-xs sm:text-sm text-slate-500">
            <span className="font-script text-lg sm:text-xl text-rose-600 font-bold">
              Forever Yours, {settings.senderName} ❤️
            </span>
            <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold text-[10px] sm:text-xs">
              💍 1 Year Completed & Forever to Go
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 💖 10 REASONS WHY I LOVE YOU SECTION                         */}
        {/* ============================================================ */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4 sm:mb-6 px-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Special Interactive Feature</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold font-serif-romantic text-slate-800 mb-1 sm:mb-1.5">
              10 Little Reasons Why I Love You 💖
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Tap each reason to reveal the sweet secret with a 5-second reading timer journey!
            </p>
          </div>

          {/* ============================================================ */}
          {/* 📱 MOBILE VIEW: PROGRESSIVE STEP-BY-STEP 5-SEC REVEAL        */}
          {/* ============================================================ */}
          <div className="block md:hidden space-y-3.5">
            
            {/* Step Progress Header */}
            <div className="glass-card rounded-2xl p-3.5 border border-rose-200 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-rose-600 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>Reason #{mobileReasonIndex + 1} of 10</span>
                </span>

                {isTimerRunning && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono text-[11px] font-bold flex items-center gap-1 animate-pulse">
                    <Clock className="w-3 h-3" />
                    <span>Reading time: {readTimer}s</span>
                  </span>
                )}

                {allReasonsCompleted && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    All 10 Unlocked! 🎉
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-rose-100 rounded-full h-1.5 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((mobileReasonIndex + (isMobileReasonRevealed ? 1 : 0)) / 10) * 100}%` }}
                />
              </div>

              {/* Quick Stepper Pills (Jump to previously unlocked reasons) */}
              <div className="flex items-center justify-between gap-1 overflow-x-auto pt-0.5 no-scrollbar">
                {REASONS_I_LOVE_YOU.map((_, idx) => {
                  const isUnlocked = idx < unlockedCount;
                  const isCurrent = idx === mobileReasonIndex;

                  return (
                    <button
                      key={idx}
                      disabled={!isUnlocked}
                      onClick={() => handleJumpToMobileReason(idx)}
                      className={`w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 transition-all ${
                        isCurrent
                          ? 'bg-rose-500 text-white ring-2 ring-rose-300 shadow-md scale-110'
                          : isUnlocked
                          ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                          : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {isUnlocked && idx < mobileReasonIndex ? '✓' : idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Interactive Reason Card for Mobile */}
            {!allReasonsCompleted ? (
              <div 
                onClick={handleRevealMobileReason}
                className={`rounded-2xl p-4 sm:p-5 transition-all duration-500 border-2 cursor-pointer shadow-xl relative select-none ${
                  isMobileReasonRevealed
                    ? 'bg-white border-rose-300 scale-[1.01]'
                    : 'bg-gradient-to-br from-rose-500 to-pink-600 text-white border-white hover:scale-[1.02] active:scale-98'
                }`}
              >
                {!isMobileReasonRevealed ? (
                  /* Card Closed / Tap to Reveal */
                  <div className="text-center py-4 space-y-2.5">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl mx-auto shadow-inner animate-bounce">
                      💌
                    </div>
                    <h4 className="text-lg font-bold font-serif-romantic tracking-wide">
                      Secret Reason #{mobileReasonIndex + 1}
                    </h4>
                    <p className="text-rose-100 text-xs px-2">
                      Tap anywhere on this card to unwrap and read Reason #{mobileReasonIndex + 1}!
                    </p>
                    <span className="inline-block px-3.5 py-1 rounded-full bg-white text-rose-600 font-bold text-xs shadow-md">
                      ✨ Tap to Reveal ✨
                    </span>
                  </div>
                ) : (
                  /* Card Open / Reason Revealed with 5s Timer */
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-rose-100 pb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                        <span>Reason #{mobileReasonIndex + 1} Revealed</span>
                      </span>

                      {/* 5-second countdown circular / badge */}
                      <span className="text-[10px] font-bold text-slate-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        {isTimerRunning ? `Next in ${readTimer}s` : 'Ready for next'}
                      </span>
                    </div>

                    <p className="font-serif-romantic italic text-sm text-slate-800 leading-relaxed pt-0.5">
                      "{REASONS_I_LOVE_YOU[mobileReasonIndex]}"
                    </p>

                    {/* Timer progress bar during 5s */}
                    {isTimerRunning && (
                      <div className="space-y-1 pt-1">
                        <div className="w-full bg-rose-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-amber-500 h-full rounded-full transition-all duration-1000 ease-linear"
                            style={{ width: `${((5 - readTimer) / 5) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Reading time: 5s</span>
                          <span>Auto-advances to Reason #{mobileReasonIndex + 2}</span>
                        </div>
                      </div>
                    )}

                    {/* Next Reason Action Button */}
                    <div className="pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextMobileReason();
                        }}
                        className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/25 transition-all"
                      >
                        <span>
                          {mobileReasonIndex < REASONS_I_LOVE_YOU.length - 1
                            ? `Next Reason #${mobileReasonIndex + 2} ➔`
                            : "Reveal Final Celebration! 🎉"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* All 10 Reasons Completed Celebration Screen */
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-pink-500/10 border-2 border-amber-300 text-center space-y-3 animate-fadeIn shadow-xl">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mx-auto shadow-md">
                  👑
                </div>
                <h4 className="text-lg font-bold font-serif-romantic text-rose-600">
                  You Unlocked All 10 Reasons! 💖
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed px-2">
                  And truth is, there are a million more reasons why I fall in love with you every single day. Happy Birthday, my whole world!
                </p>

                <button
                  onClick={handleResetMobileJourney}
                  className="px-4 py-2 rounded-full bg-rose-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 mx-auto shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Relive & Read Again from Reason 1</span>
                </button>
              </div>
            )}

          </div>

          {/* ============================================================ */}
          {/* 💻 DESKTOP VIEW: FULL 2-COLUMN INTERACTIVE FLIP GRID         */}
          {/* ============================================================ */}
          <div className="hidden md:grid md:grid-cols-2 gap-2.5 sm:gap-3.5">
            {REASONS_I_LOVE_YOU.map((reason, index) => {
              const isRevealed = desktopRevealedReasons[index];

              return (
                <div
                  key={index}
                  onClick={() => toggleDesktopReason(index)}
                  className={`p-3.5 rounded-2xl transition-all duration-300 cursor-pointer border flex items-center gap-3 select-none ${
                    isRevealed
                      ? 'bg-white shadow-md border-rose-300 scale-[1.01]'
                      : 'bg-white/60 hover:bg-white hover:border-rose-200 border-slate-200 shadow-sm'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                    isRevealed ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {isRevealed ? '❤️' : `#${index + 1}`}
                  </div>

                  <div className="flex-1 min-w-0">
                    {isRevealed ? (
                      <p className="text-xs sm:text-sm font-serif-romantic italic text-slate-800 animate-fadeIn leading-snug">
                        "{reason}"
                      </p>
                    ) : (
                      <p className="text-xs font-semibold text-slate-500 truncate">
                        Reason #{index + 1} • <span className="text-rose-500">Click to reveal</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Open Letter Modal (Responsive) */}
        {selectedLetter && (
          <div 
            onClick={() => setSelectedLetter(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-rose-200 relative animate-fadeIn max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 shrink-0">
                  {getLetterIcon(selectedLetter.icon)}
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-rose-500">
                    {selectedLetter.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif-romantic text-slate-800 leading-tight">
                    {selectedLetter.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-rose-50/60 border border-rose-100 text-slate-700 font-serif-romantic text-sm sm:text-base md:text-lg leading-relaxed italic my-4 shadow-inner whitespace-pre-line">
                "{selectedLetter.content}"
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-rose-100 text-xs sm:text-sm text-slate-500">
                <span className="font-script text-lg sm:text-xl text-rose-600 font-bold">
                  With all my love ❤️
                </span>
                <button
                  onClick={() => {
                    triggerHeartConfetti();
                    setSelectedLetter(null);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs transition-colors"
                >
                  Close & Hug 🫂
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
