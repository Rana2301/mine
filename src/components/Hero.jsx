import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Heart, Sparkles, Cake, BookOpen, Clock } from 'lucide-react';
import { triggerBirthdayFireworks, triggerHeartConfetti } from '../utils/confetti';
import { playChime } from '../utils/sound';

export const Hero = () => {
  const { settings, toggleMusic, isPlayingMusic } = useSite();

  // Relationship duration calculator (Live time counter from July 30, 2025)
  const [timeTogether, setTimeTogether] = useState({
    days: 391,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(settings.anniversaryDate || "2025-07-30").getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({ days: days || 365, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [settings.anniversaryDate]);

  const handleHeroCelebrate = () => {
    playChime();
    triggerBirthdayFireworks();
    if (!isPlayingMusic) {
      toggleMusic();
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 flex items-center justify-center overflow-visible">
      
      {/* Soft Ambient Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-rose-200/50 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-pink-300/40 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute -bottom-20 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-200/40 rounded-full blur-3xl" />
        
        {/* Floating Heart Background particles */}
        <span className="absolute top-1/4 left-4 sm:left-10 text-2xl sm:text-3xl opacity-40 animate-float-slow">💖</span>
        <span className="absolute top-1/3 right-4 sm:right-12 text-3xl sm:text-4xl opacity-30 animate-float-medium" style={{ animationDelay: '1s' }}>🎂</span>
        <span className="absolute bottom-1/4 left-1/5 text-xl sm:text-2xl opacity-40 animate-float-slow" style={{ animationDelay: '2s' }}>✨</span>
        <span className="absolute bottom-1/3 right-1/4 text-2xl sm:text-3xl opacity-30 animate-float-medium" style={{ animationDelay: '0.5s' }}>💌</span>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 text-center z-10 w-full">
        
        {/* Floating Love Crown Badge - Celebrating Our 1st Birthday Together */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 text-rose-800 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 shadow-sm border border-rose-200 hover:scale-105 transition-transform max-w-full">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 shrink-0 animate-spin" />
          <span className="font-bold text-rose-700">Celebrating Our 1st Birthday Together In Love 💖</span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-rose-400 shrink-0"></span>
          <span className="text-pink-600 font-bold shrink-0">Aug 26, 2026 Milestone 🎂</span>
        </div>

        {/* Hero Main Heading with Prominent, Fully Visible Partner Name */}
        <div className="mb-2 sm:mb-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-800 font-serif-romantic leading-tight">
            Happy 1st Birthday Together,
          </h1>
          
          <div className="py-1 sm:py-2">
            <span className="text-gradient-romantic font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl inline-block px-3 break-words drop-shadow-sm leading-tight">
              {settings.partnerName}
            </span>
          </div>
        </div>

        {/* Heartfelt Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-base text-slate-600 font-normal leading-relaxed mb-5 sm:mb-6 px-2">
          Exactly 1 year ago on <span className="text-rose-600 font-semibold">August 26, 2025</span>, I celebrated your birthday as a friend. Today, I hold your hand as the love of my life, celebrating <span className="text-rose-600 font-semibold">our very 1st birthday together as soulmates</span>.
        </p>

        {/* 1-Year Togetherness Live Counter Widget */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl glass-card shadow-xl shadow-rose-500/10 border border-white/90">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-rose-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest mb-2.5 sm:mb-3">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse shrink-0" />
            <span className="truncate">Time Since We First Met (July 30, 2025) • 365+ Days Milestone</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {/* Days */}
            <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/90 border border-rose-100 shadow-sm flex flex-col items-center justify-center">
              <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-rose-600 font-serif-romantic leading-tight">
                {timeTogether.days}
              </span>
              <span className="text-[9px] sm:text-xs font-semibold text-slate-500 uppercase mt-0.5 sm:mt-1 truncate w-full text-center">Days</span>
            </div>

            {/* Hours */}
            <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/90 border border-rose-100 shadow-sm flex flex-col items-center justify-center">
              <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-pink-600 font-serif-romantic leading-tight">
                {String(timeTogether.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-xs font-semibold text-slate-500 uppercase mt-0.5 sm:mt-1 truncate w-full text-center">Hours</span>
            </div>

            {/* Minutes */}
            <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/90 border border-rose-100 shadow-sm flex flex-col items-center justify-center">
              <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-rose-500 font-serif-romantic leading-tight">
                {String(timeTogether.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-xs font-semibold text-slate-500 uppercase mt-0.5 sm:mt-1 truncate w-full text-center">Minutes</span>
            </div>

            {/* Seconds */}
            <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/90 border border-rose-100 shadow-sm flex flex-col items-center justify-center">
              <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-rose-700 font-serif-romantic animate-pulse leading-tight">
                {String(timeTogether.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-xs font-semibold text-slate-500 uppercase mt-0.5 sm:mt-1 truncate w-full text-center">Seconds</span>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-rose-500 font-medium mt-2 sm:mt-3 italic px-1">
            "Celebrating our 1st birthday together in love, with an eternity of birthdays still to come."
          </p>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 max-w-lg sm:max-w-none mx-auto pb-2">
          <button
            onClick={handleHeroCelebrate}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Celebrate Our 1st Birthday Together 🎉</span>
          </button>

          <a
            href="#cake"
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3 rounded-full bg-white text-rose-600 font-semibold text-xs sm:text-sm shadow-md hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all border border-rose-200 flex items-center justify-center gap-2"
          >
            <Cake className="w-4 h-4 text-rose-500" />
            <span>Cut Birthday Cake 🎂</span>
          </a>

          <a
            href="#story"
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3 rounded-full bg-rose-100 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-rose-200 hover:text-rose-800 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-rose-600" />
            <span>Our 1-Yr Story 📖</span>
          </a>
        </div>

      </div>
    </section>
  );
};
