import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { INITIAL_SETTINGS, INITIAL_MILESTONES, INITIAL_PHOTOS, INITIAL_LETTERS } from '../data/initialData';
import { DEFAULT_QUOTES } from '../data/defaultQuotes';

const SiteContext = createContext();

const STORAGE_KEYS = {
  SETTINGS: 'bday_site_settings_v3',
  MILESTONES: 'bday_site_milestones_v10',
  PHOTOS: 'bday_site_photos_v4',
  QUOTES: 'bday_site_quotes_v3',
  LETTERS: 'bday_site_letters_v3',
};

export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const str = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = str.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }
  const vMatch = str.match(/[?&]v=([^&#]+)/);
  if (vMatch && vMatch[1] && vMatch[1].length === 11) {
    return vMatch[1];
  }
  const shortMatch = str.match(/youtu\.be\/([^&#?]+)/);
  if (shortMatch && shortMatch[1] && shortMatch[1].length === 11) {
    return shortMatch[1];
  }
  if (str.length === 11 && !str.includes('/') && !str.includes('.')) {
    return str;
  }
  return null;
};

export const SiteProvider = ({ children }) => {
  // Load from localStorage or use initial defaults
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically migrate to new user-requested YouTube song if old mixkit mp3 was stored
        if (!parsed.musicUrl || parsed.musicUrl.includes('mixkit')) {
          parsed.musicUrl = "https://www.youtube.com/watch?v=8pUq96pYjXM";
        }
        return { ...INITIAL_SETTINGS, ...parsed };
      }
      return INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [milestones, setMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MILESTONES);
      return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
    } catch {
      return INITIAL_MILESTONES;
    }
  });

  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PHOTOS);
      return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  });

  const [quotes, setQuotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
      return saved ? JSON.parse(saved) : DEFAULT_QUOTES;
    } catch {
      return DEFAULT_QUOTES;
    }
  });

  const [letters, setLetters] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LETTERS);
      return saved ? JSON.parse(saved) : INITIAL_LETTERS;
    } catch {
      return INITIAL_LETTERS;
    }
  });

  // Admin and Secret Modal states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('photos');

  // Secret Click Tracker (5 clicks on logo/heart opens secret admin)
  const secretClickRef = useRef({ count: 0, lastTime: 0 });

  // Audio BGM State
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef(null);
  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);

  // Global Keyboard shortcut listener (Ctrl + Shift + A or Alt + A) & URL ?admin=true query trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        setIsAdminModalOpen(true);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || urlParams.get('portal') === 'secret') {
      setIsAdminModalOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerSecretAdminClick = () => {
    const now = Date.now();
    if (now - secretClickRef.current.lastTime > 2500) {
      secretClickRef.current.count = 1;
    } else {
      secretClickRef.current.count += 1;
    }
    secretClickRef.current.lastTime = now;

    if (secretClickRef.current.count >= 5) {
      secretClickRef.current.count = 0;
      setIsAdminModalOpen(true);
    }
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(milestones));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [milestones]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [photos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [quotes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LETTERS, JSON.stringify(letters));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [letters]);

  // YouTube IFrame API and PostMessage Setup
  const youtubeVideoId = getYouTubeVideoId(settings.musicUrl);

  // Listen to postMessages from YouTube iframe
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.event === 'infoDelivery' && data.info) {
            if (data.info.playerState === 1) {
              setIsPlayingMusic(true);
            } else if (data.info.playerState === 2) {
              setIsPlayingMusic(false);
            } else if (data.info.playerState === 0) {
              playMusic();
            }
          }
        }
      } catch {
        // ignore non-json messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Direct HTML5 Audio fallback setup (if mp3 is used)
  useEffect(() => {
    if (!youtubeVideoId && audioRef.current) {
      audioRef.current.src = settings.musicUrl;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
  }, [settings.musicUrl, youtubeVideoId]);

  // Unified Play Music Function
  const playMusic = () => {
    const vid = getYouTubeVideoId(settings.musicUrl);
    if (vid) {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
          iframeRef.current.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[85]}', '*');
          iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } catch (e) {
          console.warn("YouTube postMessage error", e);
        }
      }
      if (ytPlayerRef.current && ytPlayerRef.current.playVideo) {
        try {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(85);
          ytPlayerRef.current.playVideo();
        } catch (e) {
          // ignore
        }
      }
      setIsPlayingMusic(true);
    } else if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((err) => {
        console.log("Audio autoplay prevented:", err);
      });
    }
  };

  // Unified Pause Music Function
  const pauseMusic = () => {
    const vid = getYouTubeVideoId(settings.musicUrl);
    if (vid) {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } catch (e) {
          console.warn("YouTube pause error", e);
        }
      }
      if (ytPlayerRef.current && ytPlayerRef.current.pauseVideo) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch (e) {
          // ignore
        }
      }
      setIsPlayingMusic(false);
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    }
  };

  // Toggle Music Function
  const toggleMusic = () => {
    if (isPlayingMusic) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  // Admin Auth
  const loginAdmin = (pin) => {
    if (pin === settings.adminPin || pin === '1234') {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: "Incorrect PIN. (Default is 1234)" };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // Photo actions
  const addPhoto = (newPhoto) => {
    const photoWithId = {
      id: `p-${Date.now()}`,
      likes: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...newPhoto
    };
    setPhotos(prev => [photoWithId, ...prev]);
    return photoWithId;
  };

  const updatePhoto = (id, updatedFields) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deletePhoto = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const likePhoto = (id) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
  };

  // Milestone actions
  const addMilestone = (newMilestone) => {
    const milestoneWithId = {
      id: `m-${Date.now()}`,
      stage: `Chapter ${milestones.length + 1}`,
      ...newMilestone
    };
    setMilestones(prev => [...prev, milestoneWithId]);
  };

  const updateMilestone = (id, updatedFields) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
  };

  const deleteMilestone = (id) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  // Quote actions
  const addQuote = (newQuote) => {
    const quoteWithId = {
      id: `q-${Date.now()}`,
      ...newQuote
    };
    setQuotes(prev => [quoteWithId, ...prev]);
  };

  const updateQuote = (id, updatedFields) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, ...updatedFields } : q));
  };

  const deleteQuote = (id) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  // Letter actions
  const updateLetter = (id, updatedFields) => {
    setLetters(prev => prev.map(l => l.id === id ? { ...l, ...updatedFields } : l));
  };

  // Settings update
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Backup & Restore
  const exportAllData = () => {
    const backup = {
      settings,
      milestones,
      photos,
      quotes,
      letters,
      exportDate: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `first_birthday_together_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (importedData) => {
    try {
      if (importedData.settings) setSettings(importedData.settings);
      if (importedData.milestones) setMilestones(importedData.milestones);
      if (importedData.photos) setPhotos(importedData.photos);
      if (importedData.quotes) setQuotes(importedData.quotes);
      if (importedData.letters) setLetters(importedData.letters);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const resetToDefault = () => {
    setSettings(INITIAL_SETTINGS);
    setMilestones(INITIAL_MILESTONES);
    setPhotos(INITIAL_PHOTOS);
    setQuotes(DEFAULT_QUOTES);
    setLetters(INITIAL_LETTERS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.MILESTONES);
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
    localStorage.removeItem(STORAGE_KEYS.QUOTES);
    localStorage.removeItem(STORAGE_KEYS.LETTERS);
  };

  return (
    <SiteContext.Provider value={{
      settings,
      updateSettings,
      milestones,
      addMilestone,
      updateMilestone,
      deleteMilestone,
      photos,
      addPhoto,
      updatePhoto,
      deletePhoto,
      likePhoto,
      quotes,
      addQuote,
      updateQuote,
      deleteQuote,
      letters,
      updateLetter,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      isAdminModalOpen,
      setIsAdminModalOpen,
      activeAdminTab,
      setActiveAdminTab,
      isPlayingMusic,
      toggleMusic,
      playMusic,
      pauseMusic,
      exportAllData,
      importData,
      resetToDefault,
      triggerSecretAdminClick
    }}>
      {/* Active in-viewport YouTube iframe for uninterrupted background music */}
      {youtubeVideoId && (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: 0, 
            right: 0, 
            width: '1px', 
            height: '1px', 
            opacity: 0.01, 
            pointerEvents: 'none', 
            zIndex: -1,
            overflow: 'hidden'
          }}
        >
          <iframe
            ref={iframeRef}
            id="youtube-audio-bg-player"
            title="Romantic Background Melody"
            width="200"
            height="120"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${youtubeVideoId}&playsinline=1&controls=0`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            style={{ border: 'none' }}
          />
        </div>
      )}
      {/* Direct audio element fallback */}
      <audio ref={audioRef} preload="auto" />
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
