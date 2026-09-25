import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const chimeRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements ONCE
  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio();
    }
    if (!bgmRef.current.src || bgmRef.current.src === '' || bgmRef.current.src === window.location.href) {
      bgmRef.current.src = '/audio/bgm-soothing.mp3';
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0; // Start at 0 for fade-in
    }

    if (!chimeRef.current) {
      chimeRef.current = new Audio();
    }
    if (!chimeRef.current.src || chimeRef.current.src === '' || chimeRef.current.src === window.location.href) {
      chimeRef.current.src = '/audio/chime.wav';
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

  const playIntroAndMusic = useCallback(() => {
    if (chimeRef.current) {
      chimeRef.current.currentTime = 0;
      chimeRef.current.play().catch(console.warn);
    }
    
    if (bgmRef.current) {
      bgmRef.current.volume = 0;
      bgmRef.current.play()
        .then(() => {
          setIsPlaying(true);
          // Fade in over 2 seconds
          let vol = 0;
          const fadeInterval = setInterval(() => {
            vol += 0.05;
            if (vol >= 0.3) {
              if (bgmRef.current) bgmRef.current.volume = 0.3;
              clearInterval(fadeInterval);
            } else {
              if (bgmRef.current) bgmRef.current.volume = vol;
            }
          }, 333); // 6 steps * 333ms ≈ 2 seconds
        })
        .catch((err) => {
          console.warn('BGM playback prevented', err);
          setIsPlaying(false);
        });
    }
  }, []);

  return {
    isPlaying,
    toggleMusic,
    playIntroAndMusic
  };
}
