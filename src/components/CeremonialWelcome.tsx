import { useRef } from 'react';
import gsap from 'gsap';
import { Monogram, Arch, Botanicals } from '../assets/artwork';

interface Props {
  onEnter: () => void;
  onPlayAudio: () => void;
}

export default function CeremonialWelcome({ onEnter, onPlayAudio }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const maleRef = useRef<HTMLDivElement>(null);
  const femaleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const botanicalsRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    // Play audio immediately upon interaction
    onPlayAudio();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      onEnter();
      return;
    }

    const tl = gsap.timeline({
      onComplete: onEnter
    });

    // Fade out UI buttons and text
    tl.to([enterBtnRef.current, contentRef.current, monogramRef.current, botanicalsRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0);

    // Expand path visually pulling camera forward
    tl.to(pathRef.current, {
      scaleX: 3,
      scaleY: 1.5,
      opacity: 0,
      duration: 1.4,
      ease: 'power2.inOut'
    }, 0.2);

    // Move hosts off screen to sides
    tl.to(maleRef.current, {
      x: '-35vw',
      scale: 1.2,
      opacity: 0,
      duration: 1.4,
      ease: 'power2.in'
    }, 0.2);

    tl.to(femaleRef.current, {
      x: '35vw',
      scale: 1.2,
      opacity: 0,
      duration: 1.4,
      ease: 'power2.in'
    }, 0.2);

    // Arch expands immensely to transition scene
    tl.to(archRef.current, {
      scale: 4,
      y: '20vh',
      opacity: 0,
      duration: 1.4,
      ease: 'power3.in'
    }, 0.2);
    
    // Final fade out of the container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.4
    }, 1.4);
  };

  return (
    <div ref={containerRef} className="fixed inset-0 bg-ivory-bg flex flex-col items-center justify-center overflow-hidden z-40">
      
      {/* Desktop Botanicals (Middle ground) */}
      <div ref={botanicalsRef} className="hidden lg:flex absolute inset-0 justify-between items-center w-full h-full pointer-events-none z-10 opacity-70">
        <Botanicals className="w-48 h-full" />
        <Botanicals className="w-48 h-full transform scale-x-[-1]" />
      </div>

      {/* Skip Intro */}
      <div className="absolute top-6 right-8 lg:right-12 z-50">
        <button 
          onClick={onEnter}
          className="text-gold-antique text-[10px] tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity font-serif font-medium"
        >
          Skip Intro
        </button>
      </div>

      {/* Perspective Path (Middle ground) */}
      <div 
        ref={pathRef}
        className="absolute bottom-0 w-[150%] max-w-[800px] h-[55vh] perspective-path transform origin-bottom z-20 will-change-transform"
      />

      {/* Hanging Monogram */}
      <div 
        ref={monogramRef} 
        className="absolute top-[-5vh] z-30 flex flex-col items-center pointer-events-none origin-top animate-[swing_6s_ease-in-out_infinite]"
      >
        {/* Hanging String */}
        <div className="w-[1.5px] h-[25vh] bg-gradient-to-b from-transparent via-[#b7955b] to-[#8c6b36] opacity-80"></div>
        {/* Monogram */}
        <Monogram className="w-[85px] h-[85px] -mt-2" />
      </div>

      {/* Center Content (Title) */}
      <div ref={contentRef} className="absolute top-[35vh] flex flex-col items-center pointer-events-none z-20">
        <h2 className="text-gold-antique font-serif text-[14px] leading-relaxed tracking-[0.25em] uppercase text-center opacity-90 font-medium">
          Awaiting Your<br/>Presence
        </h2>
      </div>

      {/* The Arch Foreground (Acts as a window/wall) */}
      <div ref={archRef} className="absolute inset-0 flex justify-center w-full h-full pointer-events-none transform origin-center z-30 will-change-transform">
        <Arch className="w-full max-w-[420px] h-full object-fill md:object-cover" />
      </div>

      {/* Hosts - Separated on left and right edges */}
      <div ref={maleRef} className="absolute bottom-0 left-[2vw] md:left-[10vw] lg:left-[18vw] z-40 pointer-events-none flex justify-start items-end will-change-transform">
        <img 
          src="/male_host.png" 
          alt="" 
          className="w-auto h-[28vh] md:h-[35vh] max-h-[300px] md:max-h-[400px] max-w-[35vw] md:max-w-[30vw] object-contain object-bottom origin-bottom"
          style={{ filter: 'drop-shadow(0 8px 15px rgba(0,0,0,0.15))' }}
        />
      </div>
      <div ref={femaleRef} className="absolute bottom-0 right-[2vw] md:right-[10vw] lg:right-[18vw] z-40 pointer-events-none flex justify-end items-end will-change-transform">
        <img 
          src="/female_host.png" 
          alt="" 
          className="w-auto h-[28vh] md:h-[35vh] max-h-[300px] md:max-h-[400px] max-w-[45vw] md:max-w-[35vw] object-contain object-bottom origin-bottom"
          style={{ filter: 'drop-shadow(0 8px 15px rgba(0,0,0,0.15))' }}
        />
      </div>

      {/* Tap to Enter */}
      <button 
        ref={enterBtnRef}
        onClick={handleEnter}
        className="absolute bottom-[8vh] px-10 py-[14px] text-gold-antique border border-gold-antique/50 rounded-full uppercase tracking-[0.2em] text-[11px] bg-ivory-paper/80 backdrop-blur-md shadow-[0_4px_25px_rgba(170,133,41,0.15)] hover:bg-ivory-paper hover:border-gold-antique/80 transition-all duration-300 z-50 font-serif font-medium"
      >
        Tap to Enter
      </button>
    </div>
  );
}
