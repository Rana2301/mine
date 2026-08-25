import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { BookOpen, Plus, Trash2, Edit3, Check, Sparkles, X } from 'lucide-react';
import { triggerHeartConfetti } from '../../utils/confetti';
import { playChime } from '../../utils/sound';

export const StoryManager = () => {
  const { milestones, addMilestone, updateMilestone, deleteMilestone } = useSite();

  const [editingMilestoneId, setEditingMilestoneId] = useState(null);
  const [formData, setFormData] = useState({
    stage: '',
    title: '',
    date: '',
    location: '',
    tag: '',
    iconName: 'Sparkles',
    story: '',
    highlightQuote: '',
    image: ''
  });
  const [feedback, setFeedback] = useState('');

  const handleEdit = (m) => {
    setEditingMilestoneId(m.id);
    setFormData({
      stage: m.stage || '',
      title: m.title || '',
      date: m.date || '',
      location: m.location || '',
      tag: m.tag || '',
      iconName: m.iconName || 'Sparkles',
      story: m.story || '',
      highlightQuote: m.highlightQuote || '',
      image: m.image || ''
    });
  };

  const handleCancel = () => {
    setEditingMilestoneId(null);
    setFormData({
      stage: '',
      title: '',
      date: '',
      location: '',
      tag: '',
      iconName: 'Sparkles',
      story: '',
      highlightQuote: '',
      image: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMilestoneId) {
      updateMilestone(editingMilestoneId, formData);
      setFeedback("Chapter updated successfully! ✨");
    } else {
      addMilestone(formData);
      setFeedback("New chapter added to your love story! 💖");
    }

    playChime();
    triggerHeartConfetti();
    handleCancel();
    setTimeout(() => setFeedback(''), 3500);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-200">
        <h3 className="text-lg font-bold text-slate-800 font-serif-romantic flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-rose-500" />
          <span>Our Journey Chapters & Storyline Editor</span>
        </h3>
        <p className="text-xs text-slate-600 mt-1">
          Customize the Seminar Hall 3 meeting, the Instagram notes conversation, and the 1-Year Anniversary milestones.
        </p>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Edit / Add Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            {editingMilestoneId ? <Edit3 className="w-4 h-4 text-rose-500" /> : <Plus className="w-4 h-4 text-rose-500" />}
            <span>{editingMilestoneId ? "Edit Story Chapter" : "Add New Journey Milestone"}</span>
          </h4>

          {editingMilestoneId && (
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Stage / Chapter</label>
            <input
              type="text"
              placeholder="e.g. Chapter 1"
              value={formData.stage}
              onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date / Period</label>
            <input
              type="text"
              placeholder="e.g. College Days"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="e.g. College Seminar Hall 3"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Chapter Title</label>
            <input
              type="text"
              placeholder="e.g. First Glance at Seminar Hall 3 🏛️"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tag</label>
            <input
              type="text"
              placeholder="e.g. The First Spark / The Excuse / 365 Days"
              value={formData.tag}
              onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Highlight Quote / Punchline</label>
          <input
            type="text"
            placeholder="e.g. Asking for college notes was the smartest excuse I ever made!"
            value={formData.highlightQuote}
            onChange={(e) => setFormData(prev => ({ ...prev, highlightQuote: e.target.value }))}
            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Story Description</label>
          <textarea
            rows="3"
            placeholder="Tell your romantic story here..."
            value={formData.story}
            onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
            required
            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Illustration / Photo Image URL (Optional)</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>{editingMilestoneId ? "Save Changes to Chapter" : "Add Chapter"}</span>
        </button>
      </form>

      {/* Chapters List */}
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-3">
          Current Story Chapters ({milestones.length})
        </h4>

        <div className="space-y-3">
          {milestones.map((m, idx) => (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                    {m.stage || `Chapter ${idx + 1}`}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{m.title}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{m.story}</p>
                <div className="text-[11px] text-rose-500 italic mt-1">"{m.highlightQuote}"</div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEdit(m)}
                  className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Edit Chapter"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete Chapter "${m.title}"?`)) {
                      deleteMilestone(m.id);
                    }
                  }}
                  className="p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Chapter"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
