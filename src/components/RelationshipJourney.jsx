import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Sparkles, 
  MessageSquareHeart, 
  HeartHandshake, 
  Crown, 
  MapPin, 
  Quote, 
  Heart,
  ChevronRight,
  ChevronLeft,
  Calendar
} from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { playPop } from '../utils/sound';

export const RelationshipJourney = () => {
  const { milestones } = useSite();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const containerRef = useRef(null);
  const milestoneRefs = useRef([]);

  const activeMilestone = milestones[activeChapterIndex] || milestones[0];

  const getIcon = (iconName, isLarge = false) => {
    const size = isLarge ? "w-6 h-6" : "w-5 h-5";
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={`${size} text-amber-500`} />;
      case 'MessageSquareHeart':
        return <MessageSquareHeart className={`${size} text-pink-500`} />;
      case 'HeartHandshake':
        return <HeartHandshake className={`${size} text-rose-500`} />;
      case 'Crown':
        return <Crown className={`${size} text-amber-500`} />;
      default:
        return <Heart className={`${size} text-rose-500`} />;
    }
  };

  // Scroll spy to highlight active chapter on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;

      milestoneRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.25) {
          setActiveChapterIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectChapter = (index) => {
    playPop();
    triggerHeartConfetti();
    setActiveChapterIndex(index);

    if (milestoneRefs.current[index]) {
      milestoneRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    playPop();
    triggerHeartConfetti();
    const nextIdx = (activeChapterIndex + 1) % milestones.length;
    setActiveChapterIndex(nextIdx);
    if (milestoneRefs.current[nextIdx]) {
      milestoneRefs.current[nextIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePrev = () => {
    playPop();
    const prevIdx = (activeChapterIndex - 1 + milestones.length) % milestones.length;
    setActiveChapterIndex(prevIdx);
    if (milestoneRefs.current[prevIdx]) {
      milestoneRefs.current[prevIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="story" className="py-8 sm:py-14 px-3 sm:px-6 relative bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-rose-50/70 overflow-x-clip">
      
      {/* Background Floating Decor */}
      <div className="absolute top-10 right-4 text-4xl sm:text-7xl opacity-10 pointer-events-none select-none animate-float-slow">🏛️</div>
      <div className="absolute bottom-10 left-4 text-4xl sm:text-7xl opacity-10 pointer-events-none select-none animate-float-medium">💍</div>
      <div className="absolute top-1/2 left-6 text-3xl opacity-15 pointer-events-none select-none animate-float-slow">💌</div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-2 shadow-sm border border-rose-200">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span>Our 1-Year Journey & 1st Birthday Together</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800 font-serif-romantic mb-1.5 sm:mb-2">
            How We Met & 1 Year of Us 📖💖
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            From meeting in <span className="font-semibold text-rose-600">Seminar Hall 3 on July 30, 2025</span>, to sliding into Instagram DMs for college notes, celebrating your birthday as friends on <span className="font-semibold text-rose-600">August 26, 2025</span>, and now celebrating <span className="font-semibold text-rose-600">Our 1st Birthday Together as Soulmates in August 2026</span>.
          </p>

          {/* Desktop Chapter Quick-Jump Floating Bar */}
          <div className="hidden md:inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-rose-200 shadow-md mt-3.5">
            {milestones.map((m, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                      : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{m.stage || `Chapter ${idx + 1}`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 💻 DESKTOP SCREEN: FULLY VISIBLE TIMELINE + BESIDE CHAPTERS  */}
        {/* ============================================================ */}
        <div ref={containerRef} className="hidden md:block relative pl-10 lg:pl-14">
          
          {/* Main Continuous Vertical Timeline Path */}
          <div className="relative border-l-4 border-rose-200 ml-44 lg:ml-48 space-y-8 lg:space-y-10 pb-4">
            
            {milestones.map((milestone, idx) => {
              const isActive = idx === activeChapterIndex;

              return (
                <div 
                  key={milestone.id} 
                  ref={el => milestoneRefs.current[idx] = el}
                  className="relative pl-8 lg:pl-10 group transition-all duration-500"
                >
                  
                  {/* Glowing Milestone Node Icon on the Line */}
                  <div 
                    onClick={() => handleSelectChapter(idx)}
                    className={`absolute -left-[27px] top-4 w-13 h-13 rounded-full bg-white border-4 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 z-10 select-none ${
                      isActive 
                        ? 'border-rose-500 ring-4 ring-rose-200 scale-115 shadow-rose-400/50' 
                        : 'border-rose-300 group-hover:border-rose-500 group-hover:scale-110'
                    }`}
                    title={`Click to focus Chapter ${idx + 1}`}
                  >
                    {getIcon(milestone.iconName)}
                  </div>

                  {/* Left Date and Chapter Label */}
                  <div className="absolute -left-44 lg:-left-48 top-3.5 w-40 text-right pr-3 select-none">
                    <span className={`text-xs font-black uppercase tracking-wider block transition-all ${
                      isActive ? 'text-rose-600 scale-105' : 'text-slate-800 group-hover:text-rose-600'
                    }`}>
                      {milestone.stage || `Chapter ${idx + 1}`}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                      {milestone.date}
                    </span>
                    <span className="text-[10px] text-pink-600 font-medium block truncate mt-0.5">
                      📍 {milestone.location}
                    </span>
                  </div>

                  {/* Rich Animated Milestone Card */}
                  <div className={`glass-card rounded-2xl sm:rounded-3xl p-5 lg:p-7 shadow-xl transition-all duration-500 border ${
                    isActive 
                      ? 'border-rose-300 bg-white/95 shadow-2xl shadow-rose-500/15 scale-[1.01]' 
                      : 'border-white/90 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-1'
                  }`}>
                    
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm">
                          {milestone.stage || `Chapter ${idx + 1}`}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-pink-500" />
                          <span>{milestone.location}</span>
                        </span>
                      </div>

                      <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        {milestone.tag}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-800 font-serif-romantic mb-2 leading-snug">
                      {milestone.title}
                    </h3>

                    {/* Highlight Quote Banner */}
                    {milestone.highlightQuote && (
                      <div className="my-3 p-3 sm:p-3.5 rounded-2xl bg-rose-50/80 border-l-4 border-rose-500 text-rose-800 font-serif-romantic italic text-sm sm:text-base flex items-start gap-2 shadow-sm">
                        <Quote className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <p>"{milestone.highlightQuote}"</p>
                      </div>
                    )}

                    {/* Story Paragraph */}
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3">
                      {milestone.story}
                    </p>

                    {/* Big Polaroid Style Image Preview with Hover Zoom */}
                    {milestone.image && (
                      <div className="mt-3.5 rounded-2xl overflow-hidden shadow-lg border border-rose-100 aspect-[16/9] w-full relative group/img bg-rose-50">
                        <img 
                          src={milestone.image} 
                          alt={milestone.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-xs font-medium">
                          {milestone.date}
                        </div>
                      </div>
                    )}

                    {/* Gujarati / Special Accent Banner for Instagram Chapter */}
                    {milestone.title.includes("Instagram") && (
                      <div className="mt-3 p-3 rounded-2xl bg-pink-50 border border-pink-200 text-xs sm:text-sm text-pink-800 font-medium flex items-center gap-2.5 shadow-sm">
                        <span className="text-xl shrink-0">💌</span>
                        <span className="leading-snug">
                          <strong>True Confession:</strong> "Me aeni pasethi notes mangela, pan kudrat ae mane aakhi zindagi mate aeno prem aapi didho!" (Notes were just an excuse; meeting my soulmate was destiny!)
                        </span>
                      </div>
                    )}

                    {/* August 26, 2025 1st Birthday Friend celebration highlight */}
                    {milestone.title.includes("August 26, 2025") && (
                      <div className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-800 font-medium flex items-center gap-2 shadow-sm">
                        <span className="text-lg">🎈</span>
                        <span>
                          <strong>Special Memory:</strong> Celebrating your birthday for the 1st time as friends on August 26, 2025 — exactly 1 year before today!
                        </span>
                      </div>
                    )}

                    {/* 1 Year & 1st Birthday Anniversary Banner */}
                    {(milestone.title.includes("1") && milestone.title.includes("Year")) && (
                      <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-300 text-xs sm:text-sm text-amber-900 font-semibold flex items-center justify-between shadow-sm">
                        <span className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Our 1st Birthday Together Milestone! Happy Birthday!</span>
                        </span>
                        <span className="text-rose-500 text-base">💍✨</span>
                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 📱 MOBILE SCREEN: TOUCH-OPTIMIZED STORYBOOK MODE ✨           */}
        {/* ============================================================ */}
        <div className="block md:hidden space-y-3.5">
          
          {/* Touch-Friendly Chapter Stepper Bar */}
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-2 px-1 no-scrollbar">
            {milestones.map((m, idx) => {
              const isActive = idx === activeChapterIndex;

              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectChapter(idx)}
                  className={`flex-1 min-w-[70px] p-2 rounded-xl transition-all duration-300 flex flex-col items-center justify-center border text-center relative ${
                    isActive
                      ? 'bg-white border-rose-400 shadow-md shadow-rose-500/15 scale-[1.03] ring-2 ring-rose-300'
                      : 'bg-white/60 hover:bg-white border-slate-200 opacity-75'
                  }`}
                >
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-rose-500 absolute -top-1 right-1 animate-ping" />
                  )}

                  <div className={`p-1 rounded-full mb-1 transition-transform ${isActive ? 'scale-110' : ''}`}>
                    {getIcon(m.iconName)}
                  </div>
                  <span className={`text-[10px] font-bold leading-tight ${isActive ? 'text-rose-600' : 'text-slate-600'}`}>
                    {m.stage || `Ch ${idx + 1}`}
                  </span>
                  <span className="text-[8px] text-slate-400 truncate w-full block">
                    {m.date.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Story Card for Current Chapter */}
          {activeMilestone && (
            <div className="glass-card rounded-2xl p-4 shadow-xl shadow-rose-500/10 border border-white relative transition-all duration-300 animate-fadeIn">
              
              {/* Badges */}
              <div className="flex items-center justify-between gap-1.5 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-sm">
                  {activeMilestone.stage || `Chapter ${activeChapterIndex + 1}`}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-semibold flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-pink-500" />
                  <span>{activeMilestone.location}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {activeMilestone.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 font-serif-romantic mb-2 leading-snug">
                {activeMilestone.title}
              </h3>

              {/* Highlight Quote */}
              {activeMilestone.highlightQuote && (
                <div className="my-2.5 p-3 rounded-xl bg-rose-50/90 border-l-3 border-rose-500 text-rose-800 font-serif-romantic italic text-xs flex items-start gap-1.5 shadow-inner">
                  <Quote className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <p>"{activeMilestone.highlightQuote}"</p>
                </div>
              )}

              {/* Story Content */}
              <p className="text-slate-700 text-xs leading-relaxed mb-3">
                {activeMilestone.story}
              </p>

              {/* Dynamic Synchronized Image */}
              {activeMilestone.image && (
                <div className="rounded-xl overflow-hidden shadow-md aspect-[16/9] w-full mb-3 bg-rose-50">
                  <img 
                    key={activeMilestone.id}
                    src={activeMilestone.image} 
                    alt={activeMilestone.title}
                    className="w-full h-full object-cover animate-fadeIn"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Gujarati notes excuse note */}
              {activeMilestone.title.includes("Instagram") && (
                <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-xs text-pink-800 font-medium flex items-start gap-2 mb-3">
                  <span className="text-base shrink-0">💌</span>
                  <span className="leading-snug">
                    <strong>True Story:</strong> "Me aeni pasethi notes mangela, pan kudrat ae mane aakhi zindagi mate aeno prem aapi didho!" (Notes were just an excuse; meeting you was my destiny!)
                  </span>
                </div>
              )}

              {/* 1st Birthday as Friends Special Note */}
              {activeMilestone.title.includes("August 26, 2025") && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium flex items-center gap-2 mb-3">
                  <span className="text-base shrink-0">🎈</span>
                  <span className="leading-snug">
                    <strong>Special Memory:</strong> Exactly 1 year ago on August 26, 2025, celebrating your birthday as friends for the first time!
                  </span>
                </div>
              )}

              {/* 1 Year Anniversary Banner */}
              {(activeMilestone.title.includes("1") && activeMilestone.title.includes("Year")) && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-300 text-xs text-amber-900 font-semibold flex items-center justify-between gap-1.5 mb-3">
                  <span className="flex items-center gap-1 leading-snug">
                    <Crown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Our 1st Birthday Together Milestone! Happy Birthday!</span>
                  </span>
                  <span className="text-rose-500 text-sm shrink-0">💍✨</span>
                </div>
              )}

              {/* Previous / Next Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-rose-100 gap-2">
                <button
                  onClick={handlePrev}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {milestones.map((_, i) => (
                    <span 
                      key={i} 
                      onClick={() => handleSelectChapter(i)}
                      className={`h-1.5 rounded-full cursor-pointer transition-all ${
                        i === activeChapterIndex ? 'w-5 bg-rose-500' : 'w-1.5 bg-rose-200'
                      }`} 
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-md shadow-rose-500/20"
                >
                  <span>Next Story</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
