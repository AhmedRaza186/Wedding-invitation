import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PrintedWeddingCard from './PrintedWeddingCard';
import ClosingScene from './ClosingScene';

export default function MainInvitation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <main 
      ref={containerRef} 
      className="invitation-page min-h-screen bg-[#f8f4e6] py-8 px-2 overflow-y-auto flex flex-col items-center"
    >
      <PrintedWeddingCard />
      <ClosingScene />
    </main>
  );
}
