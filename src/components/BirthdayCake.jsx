import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Sparkles, Flame, Heart, RefreshCw, Scissors, PartyPopper, Check } from 'lucide-react';
import { triggerBirthdayFireworks, triggerSideCannons } from '../utils/confetti';
import { playCandleBlow, playBirthdayJingle, playPop, playChime } from '../utils/sound';

export const BirthdayCake = () => {
  const { settings } = useSite();
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [wishRevealed, setWishRevealed] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    playCandleBlow();
    setCandlesLit(false);
    setTimeout(() => {
      playBirthdayJingle();
      triggerBirthdayFireworks();
      setWishRevealed(true);
    }, 400);
  };

  const handleCutCake = () => {
    if (isCakeCut) return;
    playPop();
    setIsCakeCut(true);
    triggerSideCannons();
    setTimeout(() => {
      playChime();
    }, 300);
  };

  const handleResetCake = () => {
    setCandlesLit(true);
    setIsCakeCut(false);
    setWishRevealed(false);
    playPop();
  };

  return (
    <section id="cake" className="py-8 sm:py-14 px-3 sm:px-4 relative overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/60 to-rose-50">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
          <PartyPopper className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" />
          <span>Interactive Birthday Cake Ceremony</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800 font-serif-romantic mb-1.5 sm:mb-2">
          Make a Wish & Cut the Cake 🎂
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto mb-6 sm:mb-8 px-2">
          Blow the candles with all your heart, make your sweetest secret wish, and cut the special slice baked with love.
        </p>

        {/* Cake Container Card */}
        <div className="relative glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-xl mx-auto shadow-xl shadow-rose-500/10 border border-white/90">
          
          {/* Virtual Cake Visual */}
          <div className="relative w-full max-w-[260px] sm:max-w-[290px] h-56 sm:h-64 mx-auto flex flex-col items-center justify-end select-none mb-5">
            
            {/* 3 Interactive Candles */}
            <div className="flex items-end justify-center gap-5 sm:gap-7 mb-[-4px] z-20">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex flex-col items-center group cursor-pointer" onClick={handleBlowCandles}>
                  
                  {/* Candle Flame / Smoke */}
                  {candlesLit ? (
                    <div className="relative mb-1">
                      {/* Glow backdrop */}
                      <div className="w-4 sm:w-5 h-6 sm:h-8 bg-amber-400/40 rounded-full blur-sm absolute -inset-1 animate-pulse" />
                      {/* Animated Flame */}
                      <div className="w-3 sm:w-3.5 h-5 sm:h-6 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full animate-candle shadow-md" />
                    </div>
                  ) : (
                    <div className="h-5 sm:h-6 flex items-center justify-center text-xs text-slate-400 animate-pulse font-mono mb-1">
                      💨
                    </div>
                  )}

                  {/* Candle Stick */}
                  <div className={`w-3 sm:w-3.5 h-9 sm:h-12 rounded-t-md shadow-sm ${
                    idx === 0 ? 'bg-gradient-to-b from-pink-300 to-rose-400' :
                    idx === 1 ? 'bg-gradient-to-b from-amber-300 to-yellow-400' :
                    'bg-gradient-to-b from-sky-300 to-indigo-400'
                  }`}>
                    {/* Candle stripe pattern */}
                    <div className="w-full h-full opacity-30 flex flex-col justify-between py-1">
                      <div className="w-full h-0.5 sm:h-1 bg-white" />
                      <div className="w-full h-0.5 sm:h-1 bg-white" />
                      <div className="w-full h-0.5 sm:h-1 bg-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Layer 1 (Top Tier) */}
            <div className="w-36 sm:w-52 h-14 sm:h-18 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 rounded-t-2xl sm:rounded-t-3xl relative border-t-2 sm:border-t-4 border-white shadow-md flex items-center justify-center overflow-hidden z-10">
              {/* Cream drips */}
              <div className="absolute top-0 inset-x-0 flex justify-around text-rose-300 text-xs sm:text-base opacity-80">
                <span>🍓</span>
                <span>✨</span>
                <span>🍓</span>
                <span className="hidden sm:inline">✨</span>
                <span>🍓</span>
              </div>
              <span className="font-script text-rose-700 font-bold text-sm sm:text-base mt-2 sm:mt-2.5 drop-shadow-sm">
                Happy Birthday!
              </span>
            </div>

            {/* Cake Layer 2 (Bottom Tier) */}
            <div className={`w-52 sm:w-68 h-18 sm:h-22 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 rounded-t-xl sm:rounded-t-2xl relative border-t-2 sm:border-t-4 border-white shadow-xl flex items-center justify-center transition-transform duration-500 ${
              isCakeCut ? 'scale-95 translate-y-1' : ''
            }`}>
              {/* Strawberry decorations */}
              <div className="absolute top-1.5 sm:top-2 inset-x-3 sm:inset-x-4 flex justify-between text-xs sm:text-sm">
                <span>🍓</span>
                <span>💖</span>
                <span>🍓</span>
                <span className="hidden sm:inline">💖</span>
                <span>🍓</span>
              </div>

              {/* Cut Slice Visualization if cut */}
              {isCakeCut ? (
                <div className="absolute inset-x-4 sm:inset-x-12 py-1 px-2.5 bg-white/90 rounded-xl shadow-inner border border-rose-200 text-rose-600 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 animate-bounce">
                  <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                  <span className="truncate">Our 1st Slice Together! 🍰💖</span>
                </div>
              ) : (
                <div className="font-script text-white text-sm sm:text-lg font-bold drop-shadow px-2 truncate">
                  {settings.partnerName} • 1st Birthday Together 🎂
                </div>
              )}
            </div>

            {/* Cake Plate Stand */}
            <div className="w-60 sm:w-76 h-3 sm:h-3.5 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-lg border border-slate-300 -mt-1 z-0" />
            <div className="w-18 sm:w-22 h-2.5 sm:h-3 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-b-lg shadow-md -mt-1" />
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full">
            {candlesLit ? (
              <button
                onClick={handleBlowCandles}
                className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <Flame className="w-4 h-4 animate-bounce text-yellow-200 shrink-0" />
                <span>Blow Out the Candles 💨</span>
              </button>
            ) : !isCakeCut ? (
              <button
                onClick={handleCutCake}
                className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm animate-pulse"
              >
                <Scissors className="w-4 h-4 shrink-0" />
                <span>Cut Our 1st Birthday Cake! 🍰</span>
              </button>
            ) : (
              <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs sm:text-sm border border-emerald-300">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Happy 1st Birthday Together, My Queen! 🎉</span>
              </div>
            )}

            {/* Reset Replay Button */}
            {(!candlesLit || isCakeCut) && (
              <button
                onClick={handleResetCake}
                className="w-full sm:w-auto px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-all flex items-center justify-center gap-1.5"
                title="Relight candles and play again"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Relight & Replay</span>
              </button>
            )}
          </div>

          {/* Secret Wish Card Revealed After Candle Blow */}
          {wishRevealed && (
            <div className="mt-4 sm:mt-5 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 border border-rose-300/80 shadow-md animate-fadeIn text-left">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs sm:text-sm mb-1.5">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 shrink-0" />
                <span>My Wish For Our 1st Birthday Together:</span>
              </div>
              <p className="text-slate-700 font-serif-romantic italic text-xs sm:text-base leading-relaxed">
                "May your smile stay as radiant as the day I first saw you in Seminar Hall 3 on July 30, 2025. Exactly 1 year since we celebrated your birthday as friends, I am blessed to hold you as my soulmate today. Happy 1st Birthday Together in love, my sweet queen! 💖"
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
