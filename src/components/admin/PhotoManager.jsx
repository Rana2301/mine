import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { DEFAULT_QUOTES } from '../../data/defaultQuotes';
import { 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Sparkles, 
  Quote as QuoteIcon, 
  X 
} from 'lucide-react';
import { triggerHeartConfetti } from '../../utils/confetti';
import { playPop, playChime } from '../../utils/sound';

export const PhotoManager = () => {
  const { photos, addPhoto, updatePhoto, deletePhoto, quotes } = useSite();

  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tag: 'Birthday Special',
    caption: '',
    quote: '',
    imageUrl: ''
  });

  const [editingPhotoId, setEditingPhotoId] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const tagOptions = [
    'Birthday Special',
    'College Memories',
    'Seminar Hall 3',
    'Instagram DM Story',
    'Cute Dates',
    '1 Year Special',
    'Candid Moments'
  ];

  // Handle local file upload (converts to Base64 data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please select a valid image file (PNG, JPG, WebP, etc.)");
      return;
    }

    // Limit size check for localStorage health (warn if > 3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert("Image is larger than 3MB. For best performance, please use an image under 3MB or use an image URL.");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setPreviewUrl(dataUrl);
      setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetQuote = (e) => {
    const selectedQuoteText = e.target.value;
    if (selectedQuoteText) {
      setFormData(prev => ({ ...prev, quote: selectedQuoteText }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.imageUrl && !previewUrl) {
      alert("Please upload an image file or enter a valid Image URL.");
      return;
    }

    const payload = {
      ...formData,
      imageUrl: formData.imageUrl || previewUrl,
      title: formData.title || 'Special Memory 💖',
      tag: formData.tag || 'Birthday Special'
    };

    if (editingPhotoId) {
      updatePhoto(editingPhotoId, payload);
      setFeedbackMsg("Photo successfully updated! ✨");
      setEditingPhotoId(null);
    } else {
      addPhoto(payload);
      setFeedbackMsg("New photo added to your romantic gallery! 🎉");
    }

    playChime();
    triggerHeartConfetti();

    // Reset Form
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tag: 'Birthday Special',
      caption: '',
      quote: '',
      imageUrl: ''
    });
    setPreviewUrl('');

    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleEditClick = (photo) => {
    setEditingPhotoId(photo.id);
    setFormData({
      title: photo.title || '',
      date: photo.date || '',
      tag: photo.tag || 'Birthday Special',
      caption: photo.caption || '',
      quote: photo.quote || '',
      imageUrl: photo.imageUrl || ''
    });
    setPreviewUrl(photo.imageUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingPhotoId(null);
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tag: 'Birthday Special',
      caption: '',
      quote: '',
      imageUrl: ''
    });
    setPreviewUrl('');
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-200">
        <h3 className="text-lg font-bold text-slate-800 font-serif-romantic flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-500" />
          <span>Upload & Manage Girlfriend's Photos & Quotes</span>
        </h3>
        <p className="text-xs text-slate-600 mt-1">
          Upload photos directly from your computer or paste image links. You can attach romantic Google-referenced birthday quotes to every photo.
        </p>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Upload & Form Section */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            {editingPhotoId ? <Edit3 className="w-4 h-4 text-rose-500" /> : <Plus className="w-4 h-4 text-rose-500" />}
            <span>{editingPhotoId ? "Edit Photo Details" : "Upload New Birthday Photo"}</span>
          </h4>

          {editingPhotoId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Edit</span>
            </button>
          )}
        </div>

        {/* Upload Mode Selector (Local File vs Web URL) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Select Image Source
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setUploadMode('file')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                uploadMode === 'file'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload From Computer / Mobile</span>
            </button>

            <button
              type="button"
              onClick={() => setUploadMode('url')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                uploadMode === 'url'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Image Web URL</span>
            </button>
          </div>
        </div>

        {/* Image Input */}
        {uploadMode === 'file' ? (
          <div>
            <label className="block text-xs text-slate-600 mb-1 font-medium">
              Choose an image file from your device:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer border border-dashed border-rose-300 rounded-2xl p-4 bg-rose-50/30"
            />
          </div>
        ) : (
          <div>
            <label className="block text-xs text-slate-600 mb-1 font-medium">
              Paste Image URL (e.g. from Google Photos, Unsplash, Imgur, Cloud):
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, imageUrl: e.target.value }));
                setPreviewUrl(e.target.value);
              }}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>
        )}

        {/* Live Preview If image exists */}
        {previewUrl && (
          <div className="flex items-center gap-4 p-3 rounded-xl bg-rose-50 border border-rose-200">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg shadow-sm border border-white"
            />
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-rose-700 block">Image Preview Ready!</span>
              <span>This image will be displayed on the polaroid wall.</span>
            </div>
          </div>
        )}

        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Photo Title / Moment Name
            </label>
            <input
              type="text"
              placeholder="e.g. Birthday Queen Smile ✨"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tag / Category
            </label>
            <select
              value={formData.tag}
              onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
              className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
            >
              {tagOptions.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quote Generator / Preset Selector */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">
              Romantic Birthday Quote for This Photo
            </label>
            <span className="text-[11px] text-rose-600 font-medium">Google Reference Quotes 💡</span>
          </div>

          {/* Quick Select from Quote Bank */}
          <select
            onChange={handleSelectPresetQuote}
            className="w-full p-2 text-xs rounded-xl bg-rose-50/60 border border-rose-200 text-slate-700 mb-2 focus:outline-none"
          >
            <option value="">-- Choose a Google-Referenced Quote Preset --</option>
            {quotes.map(q => (
              <option key={q.id} value={q.text}>
                [{q.category}] "{q.text.slice(0, 70)}..."
              </option>
            ))}
          </select>

          {/* Custom / Editable Quote text */}
          <input
            type="text"
            placeholder="Or type a custom romantic quote..."
            value={formData.quote}
            onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
          />
        </div>

        {/* Caption */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Caption / Memory Story
          </label>
          <textarea
            rows="2"
            placeholder="e.g. Sitting across from you in Seminar Hall 3, wondering how someone could be so beautiful..."
            value={formData.caption}
            onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
            className="w-full p-2.5 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          {editingPhotoId ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{editingPhotoId ? "Save Changes to Photo" : "Add Photo to Girlfriend's Wall 💖"}</span>
        </button>
      </form>

      {/* Existing Photos List */}
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-3">
          Existing Photos on Website ({photos.length})
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-14 h-14 object-cover rounded-xl shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-slate-800 truncate">{photo.title}</h5>
                <span className="text-[10px] text-rose-600 font-semibold">{photo.tag}</span>
                {photo.quote && (
                  <p className="text-[10px] text-slate-500 italic truncate">"{photo.quote}"</p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleEditClick(photo)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Edit Photo"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete photo "${photo.title}"?`)) {
                      deletePhoto(photo.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Photo"
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
