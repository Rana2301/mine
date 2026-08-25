import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { PhotoManager } from './admin/PhotoManager';
import { StoryManager } from './admin/StoryManager';
import { QuoteManager } from './admin/QuoteManager';
import { SettingsManager } from './admin/SettingsManager';
import { BackupManager } from './admin/BackupManager';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Image as ImageIcon, 
  BookOpen, 
  Quote as QuoteIcon, 
  Settings, 
  Database, 
  LogOut,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react';
import { triggerHeartConfetti } from '../utils/confetti';
import { playPop, playChime } from '../utils/sound';

export const AdminModal = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin,
    activeAdminTab,
    setActiveAdminTab
  } = useSite();

  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  if (!isAdminModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const result = loginAdmin(pinInput);
    if (result.success) {
      playChime();
      triggerHeartConfetti();
      setLoginError('');
      setPinInput('');
    } else {
      playPop();
      setLoginError(result.message);
    }
  };

  const handleLogout = () => {
    playPop();
    logoutAdmin();
  };

  const tabs = [
    { id: 'photos', name: 'Photos & Quotes', icon: ImageIcon },
    { id: 'story', name: 'Our 1-Yr Story', icon: BookOpen },
    { id: 'quotes', name: 'Quote Bank', icon: QuoteIcon },
    { id: 'settings', name: 'Site Settings', icon: Settings },
    { id: 'backup', name: 'Backup & JSON', icon: Database },
  ];

  return (
    <div 
      onClick={() => setIsAdminModalOpen(false)}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp"
      >
        
        {/* Header Bar */}
        <div className="p-3 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-rose-500 text-white shadow-md shrink-0">
              {isAdminLoggedIn ? <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /> : <Lock className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <div className="min-w-0 truncate">
              <h3 className="font-bold text-sm sm:text-lg text-white font-serif-romantic flex items-center gap-2 truncate">
                <span className="truncate">Admin Management Portal</span>
                {isAdminLoggedIn && (
                  <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 shrink-0">
                    Active
                  </span>
                )}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                {isAdminLoggedIn ? "Manage photos, seminar story, quotes & music" : "Enter PIN to access manager"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Logout Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAdminLoggedIn ? (
          /* Login Screen */
          <div className="p-6 sm:p-12 text-center max-w-md mx-auto my-auto overflow-y-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h4 className="text-lg sm:text-2xl font-bold text-slate-800 font-serif-romantic mb-1.5 sm:mb-2">
              Admin Passcode Required
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
              Only you have permission to upload photos, edit the Seminar Hall memory, and customize quotes.
            </p>

            {loginError && (
              <div className="p-2.5 sm:p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium mb-4">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3.5 sm:space-y-4 text-left">
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  placeholder="Enter PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  maxLength={10}
                  required
                  autoFocus
                  className="w-full p-3 sm:p-3.5 pr-10 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-300 text-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-rose-400 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Admin Portal</span>
              </button>

              <p className="text-[10px] sm:text-[11px] text-center text-slate-400 pt-1">
                Hint: Default PIN is <code className="font-bold text-slate-600">1234</code>
              </p>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View (Responsive) */
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            
            {/* Sidebar / Top Horizontal Scroll Tabs on mobile */}
            <div className="md:w-56 bg-slate-50 p-2 sm:p-3 border-b md:border-b-0 md:border-r border-slate-200 flex md:flex-col gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeAdminTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playPop();
                      setActiveAdminTab(tab.id);
                    }}
                    className={`px-3 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 text-left ${
                      isActive
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-rose-50 hover:text-rose-700 bg-white md:bg-transparent border md:border-0 border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Body */}
            <div className="flex-1 p-3.5 sm:p-6 overflow-y-auto bg-slate-50/50">
              {activeAdminTab === 'photos' && <PhotoManager />}
              {activeAdminTab === 'story' && <StoryManager />}
              {activeAdminTab === 'quotes' && <QuoteManager />}
              {activeAdminTab === 'settings' && <SettingsManager />}
              {activeAdminTab === 'backup' && <BackupManager />}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
