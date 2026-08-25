import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Gift, 
  Heart, 
  Sparkles, 
  Crown, 
  Lock, 
  Key, 
  Check, 
  ChevronRight, 
  Flame, 
  Volume2
} from 'lucide-react';
import { triggerBirthdayFireworks, triggerHeartConfetti } from '../utils/confetti';
import { playPop, playChime } from '../utils/sound';

export const SurpriseIntroModal = ({ isOpen, onClose }) => {
  const { settings, playMusic, toggleMusic, isPlayingMusic } = useSite();
  const [currentLayer, setCurrentLayer] = useState(1); // 1 = Wax Seal, 2 = Satin Ribbon, 3 = Final Key
  const [isUnfolding, setIsUnfolding] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  if (!isOpen) return null;

  const handleOpenLayer1 = () => {
    playChime();
    triggerHeartConfetti();
    setIsUnfolding(true);
    setTimeout(() => {
      setCurrentLayer(2);
      setIsUnfolding(false);
    }, 450);
  };

  const handleOpenLayer2 = () => {
    playPop();
    triggerHeartConfetti();
    setIsUnfolding(true);
    setTimeout(() => {
      setCurrentLayer(3);
      setIsUnfolding(false);
    }, 450);
  };

  const handleFinalOpenWebsite = () => {
    playChime();
    triggerBirthdayFireworks();
    
    // Start romantic background music when entering full website
    playMusic();

    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl transition-all duration-700 ${
      isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      
      {/* Ambient Glowing Background Lights */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-rose-500/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-pink-500/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Floating Emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <span className="absolute top-12 left-10 text-3xl opacity-30 animate-float-slow">🎁</span>
        <span className="absolute top-1/3 right-12 text-4xl opacity-25 animate-float-medium">💖</span>
        <span className="absolute bottom-16 left-16 text-3xl opacity-30 animate-float-slow">🎂</span>
        <span className="absolute bottom-1/4 right-20 text-3xl opacity-25 animate-float-medium">✨</span>
      </div>

      {/* Main Suspense Card Wrapper */}
      <div className="max-w-lg w-full relative z-10">
        
        {/* Layer Step Counter Header */}
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Layer {currentLayer} of 3 • Suspense Unfolding</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 💌 LAYER 1: THE WAX-SEALED ROYAL ENVELOPE / GIFT CARD        */}
        {/* ============================================================ */}
        {currentLayer === 1 && (
          <div className={`transition-all duration-500 transform ${isUnfolding ? 'rotate-X-90 opacity-0 scale-95' : 'rotate-X-0 opacity-100 scale-100'}`}>
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-amber-300/40 shadow-2xl shadow-rose-500/20 text-center relative overflow-hidden bg-gradient-to-b from-white/95 via-rose-50/95 to-pink-50/95">
              
              {/* Top Luxury Gold Ribbon Header */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-4 shadow-sm border border-rose-200">
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>Special Delivery for {settings.partnerName}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif-romantic text-slate-800 mb-2 leading-snug">
                A Secret Birthday Surprise Has Arrived 💌
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                Someone who loves you endlessly has wrapped a multi-layer magical world for your 1st Birthday Together.
              </p>

              {/* 3D Wax Seal Button */}
              <div className="my-6">
                <button
                  onClick={handleOpenLayer1}
                  className="group relative inline-flex flex-col items-center justify-center p-6 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-rose-700 text-white shadow-2xl shadow-rose-600/40 hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-amber-300 ring-4 ring-rose-300/50 cursor-pointer"
                  title="Tap to break seal"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-white group-hover:scale-125 transition-transform animate-pulse" />
                  </div>
                  <span className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                    Break Seal
                  </span>
                </button>
              </div>

              <p className="text-[11px] sm:text-xs font-semibold text-rose-600 italic">
                👆 Tap the red wax seal to unwrap Layer 1!
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 🎀 LAYER 2: THE SATIN RIBBON & 1-YEAR NOSTALGIA TEASER       */}
        {/* ============================================================ */}
        {currentLayer === 2 && (
          <div className={`transition-all duration-500 transform ${isUnfolding ? 'rotate-X-90 opacity-0 scale-95' : 'rotate-X-0 opacity-100 scale-100'}`}>
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-rose-300/60 shadow-2xl shadow-rose-500/20 text-center relative overflow-hidden bg-gradient-to-b from-white/95 via-pink-50/95 to-rose-50/95">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Layer 2 Unwrapped: The Story Teaser</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif-romantic text-slate-800 mb-2 leading-snug">
                365+ Days of Magic 💖
              </h2>

              <div className="my-4 p-4 rounded-2xl bg-rose-100/70 border border-rose-200 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-2 text-left font-serif-romantic">
                <div className="flex items-center gap-2 font-bold text-rose-700">
                  <span>🏛️</span>
                  <span>July 30, 2025: The First Glance in Seminar Hall 3</span>
                </div>
                <div className="flex items-center gap-2 text-pink-700">
                  <span>📱</span>
                  <span>"Me aeni pasethi notes mangela!" (The Notes DM)</span>
                </div>
                <div className="flex items-center gap-2 text-rose-700">
                  <span>🎂</span>
                  <span>August 26, 2025: Celebrated your birthday as friends</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-amber-800 bg-amber-200/60 p-2 rounded-xl border border-amber-300">
                  <span>💍</span>
                  <span>Today: Celebrating Our 1st Birthday Together in Love!</span>
                </div>
              </div>

              {/* Satin Ribbon Untie Button */}
              <div className="my-5">
                <button
                  onClick={handleOpenLayer2}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/50"
                >
                  <span>🎀 Untie Satin Ribbon to Open Layer 3 ➔</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                You are just 1 step away from your full birthday world!
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 🎂 LAYER 3: THE GOLDEN KEY & GRAND WEBSITE ENTRY             */}
        {/* ============================================================ */}
        {currentLayer === 3 && (
          <div className={`transition-all duration-500 transform ${isExiting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
            <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-2xl shadow-rose-500/30 text-center relative overflow-hidden bg-gradient-to-b from-white via-rose-50 to-amber-50">
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 flex items-center justify-center text-white text-3xl sm:text-4xl mx-auto shadow-xl mb-4 animate-bounce">
                🎂
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-3 shadow-sm border border-rose-200">
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span>The Final Reveal is Ready!</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-romantic text-slate-800 mb-2 leading-tight">
                Happy 1st Birthday Together, <br />
                <span className="text-gradient-romantic font-script text-3xl sm:text-5xl block mt-1">
                  {settings.partnerName}! 💖
                </span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                Your interactive virtual cake, memory polaroids, our 1-year timeline, and love letters are waiting for you inside!
              </p>

              {/* Grand Entry Button */}
              <button
                onClick={handleFinalOpenWebsite}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm sm:text-lg shadow-xl shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-4 ring-rose-200 animate-pulse"
              >
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span>✨ OPEN MY BIRTHDAY WEBSITE ✨</span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <Volume2 className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                <span>Romantic birthday melody will start playing on open!</span>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
