import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const chimeRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements ONCE
  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio('/audio/bgm-vow-exchange.mp3');
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0; // Start at 0 for fade-in
    }

    if (!chimeRef.current) {
      chimeRef.current = new Audio('/audio/chime.wav');
      chimeRef.current.volume = 0.5;
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
    };
  }, []);

  // Handle visibility change to pause/resume independently
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (bgmRef.current && !bgmRef.current.paused) {
          bgmRef.current.pause();
        }
      } else {
        if (isPlaying && bgmRef.current && bgmRef.current.paused) {
          bgmRef.current.play().catch(() => setIsPlaying(false));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  // Handle BGM Play/Pause manually
  const toggleMusic = useCallback(() => {
    if (!bgmRef.current) return;
    
    if (isPlaying) {
      bgmRef.current.pause();
      setIsPlaying(false);
    } else {
      bgmRef.current.volume = 0.3; // Default volume when manually toggled
      bgmRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback prevented', err);
          setIsPlaying(false);
        });
    }
  }, [isPlaying]);

  const playIntroChime = useCallback(() => {
    if (chimeRef.current) {
      chimeRef.current.currentTime = 0;
      chimeRef.current.play().catch(console.warn);
    }
  }, []);

  // Start BGM from a user gesture (Tap to Enter / Skip) and fade it in
  const startMusic = useCallback(() => {
    const bgm = bgmRef.current;
    if (!bgm || !bgm.paused) return;

    bgm.volume = 0;
    bgm.play()
      .then(() => {
        setIsPlaying(true);
        const fade = window.setInterval(() => {
          bgm.volume = Math.min(0.3, bgm.volume + 0.02);
          if (bgm.volume >= 0.3) window.clearInterval(fade);
        }, 120);
      })
      .catch((err) => {
        console.warn('Audio playback prevented', err);
        setIsPlaying(false);
      });
  }, []);

  return {
    isPlaying,
    toggleMusic,
    playIntroChime,
    startMusic
  };
}
