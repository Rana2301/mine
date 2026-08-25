import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Heart, 
  Quote, 
  Camera, 
  Calendar, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { playPop, playChime } from '../utils/sound';

export const PhotoGallery = () => {
  const { photos, likePhoto } = useSite();

  const [selectedTag, setSelectedTag] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isUserHovering, setIsUserHovering] = useState(false);

  // Touch swipe support for mobile slider
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const tags = ['All', ...new Set(photos.map(p => p.tag).filter(Boolean))];

  const filteredPhotos = selectedTag === 'All' 
    ? photos 
    : photos.filter(p => p.tag === selectedTag);

  const currentMobilePhoto = filteredPhotos[mobileSlideIndex % (filteredPhotos.length || 1)] || filteredPhotos[0];

  // 2.8 Seconds Continuous Auto-slide timer for mobile
  useEffect(() => {
    if (!isAutoPlay || isUserHovering || activeLightboxIndex !== null || filteredPhotos.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setMobileSlideIndex((prev) => (prev + 1) % filteredPhotos.length);
    }, 2800); // 2.8 seconds per slide

    return () => clearInterval(interval);
  }, [isAutoPlay, isUserHovering, activeLightboxIndex, filteredPhotos.length, mobileSlideIndex]);

  const handleTagChange = (tag) => {
    playPop();
    setSelectedTag(tag);
    setMobileSlideIndex(0);
  };

  const handleLike = (e, id) => {
    e.stopPropagation();
    playPop();
    triggerHeartConfetti();
    likePhoto(id);
  };

  const openLightbox = (index) => {
    playChime();
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextMobileSlide = () => {
    playPop();
    setMobileSlideIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevMobileSlide = () => {
    playPop();
    setMobileSlideIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    setIsUserHovering(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsUserHovering(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40; // Minimum px to consider a swipe

    if (distance > minSwipeDistance) {
      nextMobileSlide();
    } else if (distance < -minSwipeDistance) {
      prevMobileSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = (e) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-8 sm:py-14 px-3 sm:px-4 relative bg-gradient-to-b from-rose-50/50 via-pink-50/30 to-rose-50/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" />
            <span>Memories & Polaroid Scrapbook</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800 font-serif-romantic">
            Our Cherished Moments 📸💖
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1 sm:mt-1.5">
            Every picture holds a thousand unsaid words and a quote straight from my heart.
          </p>
        </div>

        {/* Tag Filters (Scrollable on mobile) */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1.5 px-1 sm:justify-center no-scrollbar">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm shrink-0 ${
                selectedTag === tag
                  ? 'bg-rose-500 text-white shadow-rose-300 ring-2 ring-rose-300'
                  : 'bg-white text-slate-600 hover:bg-rose-100 hover:text-rose-700 border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* 📱 MOBILE VIEW ONLY: 2.8s AUTO-SLIDING POLAROID CARDS        */}
        {/* ============================================================ */}
        <div className="block md:hidden">
          {filteredPhotos.length > 0 && currentMobilePhoto ? (
            <div className="space-y-3">
              
              {/* Slide Counter & Auto-slide controls */}
              <div className="flex items-center justify-between px-2 text-xs text-slate-500">
                <span className="font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Moment {mobileSlideIndex + 1} of {filteredPhotos.length}
                </span>

                {/* Auto-Slide Indicator & Pause Toggle */}
                <button
                  onClick={() => {
                    playPop();
                    setIsAutoPlay(!isAutoPlay);
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border transition-all ${
                    isAutoPlay 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  {isAutoPlay ? (
                    <>
                      <Pause className="w-2.5 h-2.5" />
                      <span>Auto-Playing (3s)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-2.5 h-2.5" />
                      <span>Paused</span>
                    </>
                  )}
                </button>
              </div>

              {/* Swipeable Polaroid Card */}
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setIsUserHovering(true)}
                onMouseLeave={() => setIsUserHovering(false)}
                onClick={() => openLightbox(mobileSlideIndex)}
                className="bg-white rounded-2xl p-3.5 shadow-xl border border-rose-100 flex flex-col relative transition-all duration-300 cursor-pointer select-none"
              >
                {/* Washi Tape Top Sticker */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-rose-200/80 backdrop-blur-sm border-t border-b border-rose-300 shadow-sm opacity-90 z-10" />

                {/* Photo Image Container */}
                <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-rose-100 mb-2.5 shadow-inner">
                  <img
                    key={currentMobilePhoto.id}
                    src={currentMobilePhoto.imageUrl}
                    alt={currentMobilePhoto.title}
                    className="w-full h-full object-cover animate-fadeIn"
                    loading="lazy"
                  />

                  {/* Tag badge */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/75 backdrop-blur-md text-white text-[10px] font-semibold">
                    {currentMobilePhoto.tag}
                  </span>

                  {/* Zoom Lightbox Trigger Icon */}
                  <div className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 text-rose-600 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Photo Content */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-rose-400" />
                      {currentMobilePhoto.date}
                    </span>
                    <span className="text-rose-500 font-semibold text-[10px] uppercase">
                      Tap to zoom
                    </span>
                  </div>

                  <h3 className="font-serif-romantic font-bold text-base text-slate-800 leading-snug">
                    {currentMobilePhoto.title}
                  </h3>

                  {currentMobilePhoto.caption && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {currentMobilePhoto.caption}
                    </p>
                  )}

                  {/* Attached Romantic Quote */}
                  {currentMobilePhoto.quote && (
                    <div className="p-2.5 rounded-xl bg-rose-50/90 border border-rose-200 text-rose-800 font-serif-romantic italic text-xs flex items-start gap-1.5 shadow-inner">
                      <Quote className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">"{currentMobilePhoto.quote}"</span>
                    </div>
                  )}

                  {/* Bottom Likes */}
                  <div className="flex items-center justify-between pt-2 border-t border-rose-100">
                    <button
                      onClick={(e) => handleLike(e, currentMobilePhoto.id)}
                      className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold text-xs px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 transition-colors shadow-sm"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                      <span>{currentMobilePhoto.likes || 0} Loves</span>
                    </button>

                    <span className="text-[11px] text-slate-400 font-medium">
                      📸 Photo #{mobileSlideIndex + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider Controls (Previous / Next Buttons & Dot Indicators) */}
              <div className="flex items-center justify-between gap-3 pt-0.5">
                <button
                  onClick={prevMobileSlide}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {/* Dot navigation indicators */}
                <div className="flex items-center gap-1.5">
                  {filteredPhotos.map((_, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        playPop();
                        setMobileSlideIndex(i);
                      }}
                      className={`h-2 rounded-full cursor-pointer transition-all ${
                        i === (mobileSlideIndex % filteredPhotos.length) 
                          ? 'w-6 bg-rose-500 shadow-sm' 
                          : 'w-2 bg-rose-200 hover:bg-rose-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextMobileSlide}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-md shadow-rose-500/25"
                  aria-label="Next photo"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            <div className="p-6 text-center bg-white rounded-2xl border border-rose-100 text-slate-500 text-xs">
              No photos found in this category.
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* 💻 DESKTOP / WEB VIEW ONLY: FULL POLAROID SCRAPBOOK GRID     */}
        {/* ============================================================ */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {filteredPhotos.map((photo, index) => {
            const rotationDegree = (index % 3 === 0) ? '-0.8deg' : (index % 3 === 1) ? '1deg' : '-0.5deg';

            return (
              <div
                key={photo.id}
                style={{ transform: `rotate(${rotationDegree})` }}
                onClick={() => openLightbox(index)}
                className="group bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-rose-100 flex flex-col justify-between h-full cursor-pointer relative"
              >
                {/* Washi Tape Top Sticker */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-200/80 backdrop-blur-sm border-t border-b border-rose-300 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity z-10" />

                {/* Photo Image Container (Consistent Aspect Ratio & Fit) */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-rose-100 mb-3 shrink-0 shadow-inner">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Tag badge */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-semibold">
                    {photo.tag}
                  </span>

                  {/* Expand icon overlay on hover */}
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-rose-600 shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Photo Content (Equal Heights) */}
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-rose-400" />
                        {photo.date}
                      </span>
                      <span className="text-rose-500 font-semibold text-[10px] uppercase">
                        Click to view
                      </span>
                    </div>

                    <h3 className="font-serif-romantic font-bold text-base sm:text-lg text-slate-800 mb-1.5 line-clamp-1" title={photo.title}>
                      {photo.title}
                    </h3>

                    {photo.caption && (
                      <p className="text-xs text-slate-600 line-clamp-2 mb-2 min-h-[2rem] leading-relaxed">
                        {photo.caption}
                      </p>
                    )}

                    {/* Romantic Quote attached to photo (Consistent Height) */}
                    {photo.quote && (
                      <div className="p-2.5 rounded-xl bg-rose-50/90 border border-rose-200 text-rose-800 font-serif-romantic italic text-xs flex items-start gap-1.5 mb-1.5 min-h-[3.25rem]">
                        <Quote className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">"{photo.quote}"</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Likes */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-rose-100 mt-auto">
                    <button
                      onClick={(e) => handleLike(e, photo.id)}
                      className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold text-xs px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 transition-colors shadow-sm"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                      <span>{photo.likes || 0} Loves</span>
                    </button>

                    <span className="text-[11px] text-slate-400 font-medium">
                      Moment #{index + 1}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 🔍 LIGHTBOX MODAL (FOR BOTH MOBILE SLIDER & DESKTOP GRID)    */}
        {/* ============================================================ */}
        {activeLightboxIndex !== null && filteredPhotos[activeLightboxIndex] && (
          <div 
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-base transition-colors z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={prevLightbox}
              className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[88vh]"
            >
              {/* Image side */}
              <div className="md:w-3/5 bg-black flex items-center justify-center p-2 relative max-h-[45vh] md:max-h-[85vh]">
                <img
                  src={filteredPhotos[activeLightboxIndex].imageUrl}
                  alt={filteredPhotos[activeLightboxIndex].title}
                  className="max-h-[42vh] md:max-h-[80vh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              {/* Information side */}
              <div className="md:w-2/5 p-4 sm:p-8 flex flex-col justify-between bg-slate-900 text-white overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] sm:text-xs font-semibold border border-rose-500/30">
                      {filteredPhotos[activeLightboxIndex].tag}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-400">
                      {filteredPhotos[activeLightboxIndex].date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-serif-romantic text-white mb-2 sm:mb-3 leading-snug">
                    {filteredPhotos[activeLightboxIndex].title}
                  </h3>

                  {filteredPhotos[activeLightboxIndex].caption && (
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                      {filteredPhotos[activeLightboxIndex].caption}
                    </p>
                  )}

                  {/* Romantic Quote highlight */}
                  {filteredPhotos[activeLightboxIndex].quote && (
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-950/50 border border-rose-500/30 text-rose-200 font-serif-romantic italic text-xs sm:text-base flex items-start gap-2 shadow-inner">
                      <Quote className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <p>"{filteredPhotos[activeLightboxIndex].quote}"</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 sm:pt-6 border-t border-slate-800 flex items-center justify-between mt-4">
                  <button
                    onClick={(e) => handleLike(e, filteredPhotos[activeLightboxIndex].id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                    <span>Send Love ({filteredPhotos[activeLightboxIndex].likes || 0})</span>
                  </button>

                  <span className="text-[11px] sm:text-xs text-slate-400">
                    {activeLightboxIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Nav */}
            <button
              onClick={nextLightbox}
              className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
