import React, { useState } from 'react';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BirthdayCake } from './components/BirthdayCake';
import { RelationshipJourney } from './components/RelationshipJourney';
import { PhotoGallery } from './components/PhotoGallery';
import { LoveLetters } from './components/LoveLetters';
import { LoveCalculator } from './components/LoveCalculator';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { SurpriseIntroModal } from './components/SurpriseIntroModal';

export function AppContent() {
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  return (
    <div className="min-h-screen bg-rose-50/40 text-slate-800 relative selection:bg-rose-500 selection:text-white">
      
      {/* 🎁 Front Layer-by-Layer Suspense Unfolding Card Intro Modal */}
      <SurpriseIntroModal 
        isOpen={isIntroOpen} 
        onClose={() => setIsIntroOpen(false)} 
      />

      {/* Floating Glass Navbar */}
      <Navbar onReplayIntro={() => setIsIntroOpen(true)} />

      {/* Hero Section with 1-Year Live Counter */}
      <Hero />

      {/* Interactive Birthday Cake Ceremony */}
      <BirthdayCake />

      {/* Our 1-Year Relationship Journey (Seminar Hall 3 & Instagram notes story) */}
      <RelationshipJourney />

      {/* Polaroid Memory Wall & Scrapbook Gallery */}
      <PhotoGallery />

      {/* Sealed Love Letters & 10 Reasons Flip Cards */}
      <LoveLetters />

      {/* Love Stats & Birthday Secret Scratch Card */}
      <LoveCalculator />

      {/* Footer */}
      <Footer onReplayIntro={() => setIsIntroOpen(true)} />

      {/* Admin Management Modal (Protected with Secret Shortcut / Easter Egg) */}
      <AdminModal />

    </div>
  );
}

export function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}

export default App;
