import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Heart, Music, VolumeX, Sparkles, Menu, X, Gift } from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { playPop } from '../utils/sound';

export const Navbar = ({ onReplayIntro }) => {
  const { 
    settings, 
    isPlayingMusic, 
    toggleMusic, 
    triggerSecretAdminClick 
  } = useSite();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Birthday Cake 🎂', href: '#cake' },
    { name: 'Our 1-Yr Story 📖', href: '#story' },
    { name: 'Polaroids 📸', href: '#gallery' },
    { name: 'Love Letters ✉️', href: '#letters' },
  ];

  const handleLogoClick = () => {
    triggerHeartConfetti();
    triggerSecretAdminClick(); // Secret: 5 rapid clicks unlocks admin PIN prompt!
  };

  const handleReplayClick = () => {
    playPop();
    triggerHeartConfetti();
    if (onReplayIntro) onReplayIntro();
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <nav className="glass-card rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3 shadow-lg shadow-rose-500/10 flex items-center justify-between border border-white/70">
          
          {/* Logo / Couple Name (Secret 5-click easter egg to open admin) */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer select-none min-w-0"
            title="💖 Happy Birthday & 1 Year Milestone"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0 truncate">
              <span className="font-script text-lg sm:text-2xl font-bold text-rose-600 leading-tight truncate">
                {settings.partnerName}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-wider font-semibold uppercase text-rose-400 truncate">
                1 Year & Birthday Special 🎂
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Icons: Replay Intro, Music & Confetti */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Replay Folding Surprise Card Button */}
            {onReplayIntro && (
              <button
                onClick={handleReplayClick}
                title="Replay Suspense Unwrapping Card"
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-[11px] sm:text-xs flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
                <span className="hidden md:inline">Unbox Surprise</span>
              </button>
            )}

            {/* Music Toggle */}
            <button
              onClick={toggleMusic}
              title={isPlayingMusic ? "Pause Background Song" : "Play Background Song"}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                isPlayingMusic 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/30 ring-2 ring-rose-300' 
                  : 'bg-white text-rose-600 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              {isPlayingMusic ? (
                <>
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 bg-white rounded-full h-3 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 bg-white rounded-full h-2 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 bg-white rounded-full h-3 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold">Playing 🎵</span>
                </>
              ) : (
                <>
                  <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold">Play Song 🎶</span>
                </>
              )}
            </button>

            {/* Quick Confetti Burst */}
            <button
              onClick={triggerHeartConfetti}
              title="Send Love Confetti"
              className="p-2 sm:p-2.5 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 hover:scale-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 glass-card rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/80 space-y-1.5 animate-fadeIn">
            {onReplayIntro && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleReplayClick();
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center gap-2 text-sm mb-1"
              >
                <Gift className="w-4 h-4 text-amber-600" />
                <span>🎁 Replay Suspense Folding Card</span>
              </button>
            )}

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-slate-700 font-medium hover:bg-rose-100 hover:text-rose-700 transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
