import React from 'react';
import { useSite } from '../context/SiteContext';
import { Heart, Gift } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { playPop } from '../utils/sound';

export const Footer = ({ onReplayIntro }) => {
  const { settings, triggerSecretAdminClick } = useSite();

  const handleHeartClick = () => {
    triggerHeartConfetti();
    triggerSecretAdminClick(); // Secret 5-click easter egg
  };

  const handleReplayClick = () => {
    playPop();
    triggerHeartConfetti();
    if (onReplayIntro) onReplayIntro();
  };

  return (
    <footer className="py-8 sm:py-10 px-4 bg-slate-900 text-slate-300 relative overflow-hidden border-t border-rose-900/40">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Heart icon clicker (Secret 5-click easter egg) */}
        <div 
          onClick={handleHeartClick}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-lg shadow-rose-500/30 select-none"
          title="Send Love Confetti 💖"
        >
          <Heart className="w-6 h-6 fill-white animate-pulse" />
        </div>

        <h3 className="font-script text-2xl sm:text-3xl font-bold text-white mb-1.5">
          {settings.partnerName} & {settings.senderName}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-4">
          From Seminar Hall 3 on July 30, 2025 to 1 Year of Unconditional Love. Happy Birthday, my whole world! 🎂✨
        </p>

        {/* Replay Folding Card Button */}
        {onReplayIntro && (
          <div className="mb-4">
            <button
              onClick={handleReplayClick}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-300 hover:text-white text-xs font-semibold border border-white/15 transition-all"
            >
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>🎁 Replay Suspense Unwrapping Card</span>
            </button>
          </div>
        )}

        {/* Quick Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-slate-400 mb-5">
          <a href="#hero" className="hover:text-rose-400 transition-colors">Home</a>
          <span>•</span>
          <a href="#cake" className="hover:text-rose-400 transition-colors">Birthday Cake</a>
          <span>•</span>
          <a href="#story" className="hover:text-rose-400 transition-colors">Our 1-Yr Story</a>
          <span>•</span>
          <a href="#gallery" className="hover:text-rose-400 transition-colors">Photo Wall</a>
          <span>•</span>
          <a href="#letters" className="hover:text-rose-400 transition-colors">Love Letters</a>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
          Crafted with infinite ❤️ for your special day • 1 Year Anniversary & 1st Birthday Edition
        </div>

      </div>
    </footer>
  );
};
