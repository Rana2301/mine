import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Sparkles, Gift } from 'lucide-react';
import { triggerBirthdayFireworks } from '../utils/confetti';
import { playChime } from '../utils/sound';

export const LoveCalculator = () => {
  const { settings } = useSite();
  const [isScratched, setIsScratched] = useState(false);

  const handleScratch = () => {
    if (isScratched) return;
    playChime();
    triggerBirthdayFireworks();
    setIsScratched(true);
  };

  const funStats = [
    { label: "Love Compatibility", value: "100%", icon: "💖", desc: "Destined Soulmates" },
    { label: "Days Together", value: "365+", icon: "🗓️", desc: "1 Year Milestone" },
    { label: "Notes Asked For", value: "1 Sweet DM", icon: "📚", desc: "Turned into Forever" },
    { label: "Future Together", value: "∞ Infinity", icon: "✨", desc: "Lifetime of Smiles" },
  ];

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7 px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
            <Gift className="w-3.5 h-3.5 text-rose-500" />
            <span>Special Birthday Surprise & Milestones</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 font-serif-romantic mb-1 sm:mb-1.5">
            Our Love Stats & Surprise Gift 🎁
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Proven by the stars, Seminar Hall 3 destiny, and 365 days of evidence!
          </p>
        </div>

        {/* Fun Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
          {funStats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-md border border-rose-100 hover:scale-105 transition-transform"
            >
              <div className="text-2xl sm:text-3xl mb-1">{stat.icon}</div>
              <div className="text-lg sm:text-xl font-bold font-serif-romantic text-rose-600 mb-0.5">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-700">{stat.label}</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Scratch / Tap Card for Birthday Coupon */}
        <div className="max-w-lg mx-auto">
          <div 
            onClick={handleScratch}
            className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center cursor-pointer overflow-hidden transition-all duration-500 shadow-xl border-2 ${
              isScratched 
                ? 'bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-pink-500/10 border-amber-300' 
                : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white border-white hover:scale-102 active:scale-98'
            }`}
          >
            {!isScratched ? (
              <div className="py-2 sm:py-3 select-none">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl mx-auto mb-2.5 animate-bounce">
                  🎁
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif-romantic mb-1">
                  Secret Birthday Gift Voucher
                </h3>
                <p className="text-rose-100 text-xs sm:text-sm mb-2.5 sm:mb-3">
                  Tap here to scratch and claim your birthday surprise from {settings.senderName}!
                </p>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white text-rose-600 font-bold text-xs shadow-md">
                  ✨ Tap to Scratch & Reveal ✨
                </span>
              </div>
            ) : (
              <div className="py-1 animate-fadeIn text-slate-800 text-left sm:text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold mb-2 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>BIRTHDAY VIP VOUCHER UNLOCKED</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif-romantic text-rose-600 mb-1.5 leading-tight">
                  100% Free Lifetime Love & Unlimited Hugs Pass! 🎫💖
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm mb-2.5 leading-relaxed">
                  <strong>Entitles the Birthday Queen to:</strong>
                  <br />• 1 Special Romantic Dinner Date of your choice
                  <br />• Unlimited Warm Hugs & Cuddles whenever requested
                  <br />• Zero arguments win privileges for 1 whole week! 😉
                </p>

                <div className="text-[10px] sm:text-[11px] text-rose-500 font-bold uppercase tracking-wider">
                  Signed with infinite devotion by {settings.senderName} ❤️
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
