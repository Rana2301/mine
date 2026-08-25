import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Download, Upload, RotateCcw, AlertTriangle, Check, FileJson } from 'lucide-react';
import { triggerHeartConfetti } from '../../utils/confetti';
import { playChime, playPop } from '../../utils/sound';

export const BackupManager = () => {
  const { exportAllData, importData, resetToDefault } = useSite();
  const [importStatus, setImportStatus] = useState('');

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result);
        const res = importData(json);
        if (res.success) {
          playChime();
          triggerHeartConfetti();
          setImportStatus("Website backup successfully restored! 🎉");
        } else {
          setImportStatus(`Import error: ${res.message}`);
        }
      } catch (err) {
        setImportStatus(`Invalid JSON file: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data back to original defaults? This will erase any newly added custom photos.")) {
      resetToDefault();
      playPop();
      setImportStatus("Reset to default template completed!");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-200">
        <h3 className="text-lg font-bold text-slate-800 font-serif-romantic flex items-center gap-2">
          <FileJson className="w-5 h-5 text-rose-500" />
          <span>Website Backup & Data Restore</span>
        </h3>
        <p className="text-xs text-slate-600 mt-1">
          Export your complete website content (photos, story, quotes, settings) as a JSON file to save a backup, or restore from a previous file.
        </p>
      </div>

      {importStatus && (
        <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Export Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-rose-500" />
            <span>Download Full Backup (JSON)</span>
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Saves all your photos, Seminar Hall story, quotes, and settings onto your computer.
          </p>
        </div>

        <button
          onClick={() => {
            playChime();
            exportAllData();
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4 text-rose-400" />
          <span>Export JSON File</span>
        </button>
      </div>

      {/* Import Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Upload className="w-4 h-4 text-rose-500" />
            <span>Restore / Import Data (JSON)</span>
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Upload a previously exported backup file to restore all content instantly.
          </p>
        </div>

        <label className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span>Select JSON File</span>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileImport}
            className="hidden"
          />
        </label>
      </div>

      {/* Reset Card */}
      <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-rose-800 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Reset Website to Default Data</span>
          </h4>
          <p className="text-xs text-rose-600/80 mt-1">
            Resets all photos, story, quotes, and settings back to original Seminar Hall & notes story defaults.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 shrink-0 border border-rose-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

    </div>
  );
};
