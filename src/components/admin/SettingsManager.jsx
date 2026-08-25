import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Settings, Save, Check, Music, KeyRound, Heart, Calendar } from 'lucide-react';
import { triggerHeartConfetti } from '../../utils/confetti';
import { playChime } from '../../utils/sound';

export const SettingsManager = () => {
  const { settings, updateSettings } = useSite();
  const [formData, setFormData] = useState({ ...settings });
  const [feedback, setFeedback] = useState('');

  const musicPresets = [
    { label: "Special Song (YouTube: 8pUq96pYjXM) - Default", url: "https://www.youtube.com/watch?v=8pUq96pYjXM" },
    { label: "Romantic Piano Melody", url: "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-102.mp3" },
    { label: "Sweet Acoustic Guitar", url: "https://assets.mixkit.co/music/preview/mixkit-love-story-acoustic-guitar-55.mp3" },
    { label: "Serene Loving Piano", url: "https://assets.mixkit.co/music/preview/mixkit-warm-romantic-piano-101.mp3" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setFeedback("Settings saved successfully! ✨");
    playChime();
    triggerHeartConfetti();
    setTimeout(() => setFeedback(''), 3500);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 to-indigo-500/10 border border-rose-200">
        <h3 className="text-lg font-bold text-slate-800 font-serif-romantic flex items-center gap-2">
          <Settings className="w-5 h-5 text-rose-500" />
          <span>General Couple Settings & Passcode</span>
        </h3>
        <p className="text-xs text-slate-600 mt-1">
          Customize your names, anniversary start date for the 1-year counter, background music, and master letter.
        </p>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        
        {/* Couple Names */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Couple Information</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Girlfriend's Name (Display Title)
              </label>
              <input
                type="text"
                value={formData.partnerName}
                onChange={(e) => setFormData(prev => ({ ...prev, partnerName: e.target.value }))}
                required
                className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name / Sender Signature
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => setFormData(prev => ({ ...prev, senderName: e.target.value }))}
                required
                className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Key Dates (1-year anniversary & birthday) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span>Important Milestones</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Relationship Start Date (For 1-Year Counter)
              </label>
              <input
                type="date"
                value={formData.anniversaryDate}
                onChange={(e) => setFormData(prev => ({ ...prev, anniversaryDate: e.target.value }))}
                className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Her Birthday Date
              </label>
              <input
                type="date"
                value={formData.birthdayDate}
                onChange={(e) => setFormData(prev => ({ ...prev, birthdayDate: e.target.value }))}
                className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Music URL */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-rose-500" />
            <span>Background Romantic Music</span>
          </h4>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Preset Romantic Tracks:</label>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  setFormData(prev => ({ ...prev, musicUrl: e.target.value }));
                }
              }}
              className="w-full p-2.5 text-xs rounded-xl bg-rose-50/60 border border-rose-200 text-slate-700 focus:outline-none"
            >
              {musicPresets.map((track, i) => (
                <option key={i} value={track.url}>{track.label}</option>
              ))}
            </select>

            <label className="block text-xs font-semibold text-slate-700 mt-2">Custom MP3 Audio URL:</label>
            <input
              type="url"
              value={formData.musicUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, musicUrl: e.target.value }))}
              placeholder="https://.../music.mp3"
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Admin PIN */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-rose-500" />
            <span>Security & Admin Passcode</span>
          </h4>

          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Secret Admin PIN (Default: 1234)
            </label>
            <input
              type="password"
              value={formData.adminPin}
              onChange={(e) => setFormData(prev => ({ ...prev, adminPin: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Master Birthday Letter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Her Special Master Birthday & 1-Year Letter
          </label>
          <textarea
            rows="5"
            value={formData.specialLetter}
            onChange={(e) => setFormData(prev => ({ ...prev, specialLetter: e.target.value }))}
            className="w-full p-3 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none font-serif-romantic"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </form>

    </div>
  );
};
