import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { QUOTE_CATEGORIES } from '../../data/defaultQuotes';
import { Quote, Plus, Trash2, Edit3, Check, Sparkles, X, Shuffle } from 'lucide-react';
import { triggerHeartConfetti } from '../../utils/confetti';
import { playChime } from '../../utils/sound';

export const QuoteManager = () => {
  const { quotes, addQuote, updateQuote, deleteQuote } = useSite();

  const [editingQuoteId, setEditingQuoteId] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    author: 'From My Heart',
    category: 'Birthday Love',
    tags: 'romantic, birthday'
  });
  const [feedback, setFeedback] = useState('');

  const handleEdit = (q) => {
    setEditingQuoteId(q.id);
    setFormData({
      text: q.text || '',
      author: q.author || 'From My Heart',
      category: q.category || 'Birthday Love',
      tags: Array.isArray(q.tags) ? q.tags.join(', ') : (q.tags || '')
    });
  };

  const handleCancel = () => {
    setEditingQuoteId(null);
    setFormData({
      text: '',
      author: 'From My Heart',
      category: 'Birthday Love',
      tags: 'romantic, birthday'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      text: formData.text,
      author: formData.author || 'From My Heart',
      category: formData.category || 'Birthday Love',
      tags: tagArray
    };

    if (editingQuoteId) {
      updateQuote(editingQuoteId, payload);
      setFeedback("Quote updated successfully! ✨");
    } else {
      addQuote(payload);
      setFeedback("New quote added to your romantic library! 💌");
    }

    playChime();
    triggerHeartConfetti();
    handleCancel();
    setTimeout(() => setFeedback(''), 3500);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-200">
        <h3 className="text-lg font-bold text-slate-800 font-serif-romantic flex items-center gap-2">
          <Quote className="w-5 h-5 text-rose-500" />
          <span>Romantic Quotes & Google Reference Library</span>
        </h3>
        <p className="text-xs text-slate-600 mt-1">
          Add personalized messages, poetry, or curated Google birthday quotes for your girlfriend.
        </p>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            {editingQuoteId ? <Edit3 className="w-4 h-4 text-rose-500" /> : <Plus className="w-4 h-4 text-rose-500" />}
            <span>{editingQuoteId ? "Edit Quote" : "Add New Romantic Quote"}</span>
          </h4>

          {editingQuoteId && (
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

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Quote Text</label>
          <textarea
            rows="2"
            placeholder="e.g. You make my entire life feel like poetry..."
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            required
            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Author / Credit</label>
            <input
              type="text"
              placeholder="e.g. From My Heart / Rumi / Leo Christopher"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
            >
              {QUOTE_CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. romantic, birthday, soulmate"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>{editingQuoteId ? "Save Quote Changes" : "Save Quote to Library"}</span>
        </button>
      </form>

      {/* Existing Quotes */}
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-3">
          Quotes in Bank ({quotes.length})
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold">
                  {q.category}
                </span>
                <p className="text-xs text-slate-700 italic mt-1.5 mb-2 font-serif-romantic">
                  "{q.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span>— {q.author}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(q)}
                    className="p-1 rounded-lg text-slate-600 hover:text-rose-600"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Delete this quote?")) {
                        deleteQuote(q.id);
                      }
                    }}
                    className="p-1 rounded-lg text-slate-600 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
