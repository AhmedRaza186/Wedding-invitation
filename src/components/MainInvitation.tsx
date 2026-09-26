import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScratchDate from './ScratchDate';
import Countdown from './Countdown';
import cardReference from '../assets/card-reference.jpg';
import { MAPS_LINK, NIKKAH_MAPS_LINK, CALENDAR_LINK } from '../config/links';
import './Invitation.css';

const Ornament = () => (
  <svg className="ornament" viewBox="0 0 200 20" aria-hidden="true">
    <path d="M0 10 H78 M122 10 H200" stroke="currentColor" strokeWidth="0.8" />
    <path d="M100 2 L106 10 L100 18 L94 10 Z" fill="currentColor" />
    <circle cx="86" cy="10" r="1.8" fill="currentColor" />
    <circle cx="114" cy="10" r="1.8" fill="currentColor" />
  </svg>
);

const Mosque = () => (
  <svg className="mosque" viewBox="0 0 160 90" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M80 6 v6" />
    <circle cx="80" cy="4" r="1.6" fill="currentColor" />
    <path d="M52 44 C52 26 64 14 80 12 C96 14 108 26 108 44 Z" />
    <path d="M44 44 H116 V88 H44 Z" />
    <path d="M70 88 V66 C70 58 75 54 80 54 C85 54 90 58 90 66 V88" />
    <path d="M50 56 h10 M100 56 h10" />
    <path d="M20 88 V30 M32 88 V30 M20 30 C20 20 32 20 32 30 M26 18 v-6" />
    <path d="M128 88 V30 M140 88 V30 M128 30 C128 20 140 20 140 30 M134 18 v-6" />
    <path d="M4 88 H156" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);

// October 2026 starts on a Thursday
const OCT_OFFSET = new Date(2026, 9, 1).getDay();
const OCT_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function MainInvitation() {
  const containerRef = useRef<HTMLElement>(null);
  const [dateRevealed, setDateRevealed] = useState(false);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    root.querySelectorAll('.reveal').forEach((el) => {
      if (prefersReducedMotion) el.classList.add('is-visible');
      else observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={containerRef} className="invite">
      {/* 1 — Names */}
      <section className="panel panel--arch reveal" aria-label="Wedding invitation for Marium and Muhammad Ibrahim">
        <p className="bismillah step" style={{ '--i': 0 } as React.CSSProperties} lang="ar" dir="rtl">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <div className="intro">
          <p className="step" style={{ '--i': 1 } as React.CSSProperties}>The family members of</p>
          <p className="intro__host step" style={{ '--i': 2 } as React.CSSProperties}>Mr. Muhammad Ishaq Lobaniya (Late)</p>
          <p className="step" style={{ '--i': 3 } as React.CSSProperties}>request the honour of your presence at the</p>
          <h2 className="intro__event step" style={{ '--i': 4 } as React.CSSProperties}>Wedding Ceremony</h2>
          <p className="step" style={{ '--i': 5 } as React.CSSProperties}>of their beloved grand daughter</p>
        </div>

        <div className="couple">
          <h1 className="couple__name ink-write gold-text" style={{ '--w': '1.4s' } as React.CSSProperties}>Marium</h1>
          <p className="couple__parents step" style={{ '--i': 14 } as React.CSSProperties}>D/O Mr. &amp; Mrs. Muhammad Shahid Lobaniya</p>
          <span className="couple__with step" style={{ '--i': 15 } as React.CSSProperties}>with</span>
          <h1 className="couple__name ink-write gold-text" style={{ '--w': '3.2s' } as React.CSSProperties}>Muhammad Ibrahim</h1>
          <p className="couple__parents step" style={{ '--i': 24 } as React.CSSProperties}>S/O Mr. &amp; Mrs. Muhammad Shakeel Ismail Karachi Wala</p>
        </div>

        <button
          type="button"
          className="scroll-cue step"
          style={{ '--i': 27 } as React.CSSProperties}
          onClick={(e) => e.currentTarget.closest('section')?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <span>Scroll Down</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
            <path d="M6 4l6 6 6-6" opacity="0.5" />
          </svg>
        </button>
      </section>

      {/* 2 — Date (single scratch) */}
      <section className="panel reveal" aria-label="Wedding date">
        <header className="panel__head">
          <span className="eyebrow">Save the date</span>
          <h2 className="script-title">The Blessed Day</h2>
        </header>
        <ScratchDate onReveal={() => setDateRevealed(true)} />
      </section>

      {/* 3 — Location */}
      <section className="panel reveal" aria-label="Venue">
        <header className="panel__head">
          <span className="eyebrow">The venue</span>
          <h2 className="script-title">Carnation Banquet</h2>
        </header>
        <p className="venue__address">Main Shahrah-e-Faisal, Karachi.</p>
        <div className="venue__times">
          <div><span>Gathering</span><strong>9:00 PM</strong></div>
          <i aria-hidden="true" />
          <div><span>Dinner</span><strong>10:00 PM</strong></div>
        </div>
        <div className="venue__qr" aria-label="Venue location QR code from the printed card">
          <div className="venue__qr-window" aria-hidden="true">
            <img src={cardReference} width="1600" height="1071" alt="" />
          </div>
          <span>Scan for location</span>
        </div>
        <a className="btn" href={MAPS_LINK} target="_blank" rel="noopener noreferrer" aria-label="Get directions to Carnation Banquet on Google Maps">
          <PinIcon /> Get Directions
        </a>
      </section>

      {/* 4 — Calendar */}
      <section className="panel reveal" aria-label="Calendar">
        <header className="panel__head">
          <span className="eyebrow">Mark your calendar</span>
          <h2 className="script-title">October 2026</h2>
        </header>
        <div className={`calendar ${dateRevealed ? 'is-lit' : ''}`} aria-hidden="true">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} className="calendar__dow">{d}</span>
          ))}
          {Array.from({ length: OCT_OFFSET }, (_, i) => <span key={`b${i}`} />)}
          {OCT_DAYS.map((d) => (
            <span
              key={d}
              className={d === 10 ? 'calendar__day calendar__day--wedding' : d === 4 ? 'calendar__day calendar__day--nikkah' : 'calendar__day'}
            >
              {d}
            </span>
          ))}
        </div>
        <div className="calendar__legend">
          <span><i className="dot dot--nikkah" /> 4th · Nikkah</span>
          <span><i className="dot dot--wedding" /> 10th · Wedding</span>
        </div>
        <Countdown />
        <a className="btn" href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer" aria-label="Add Wedding Ceremony to Google Calendar">
          <CalendarIcon /> Add to Calendar
        </a>
      </section>

      {/* 5 — Nikkah */}
      <section className="panel panel--nikkah reveal" aria-label="Nikkah ceremony">
        <Mosque />
        <header className="panel__head">
          <span className="eyebrow">In the house of Allah</span>
          <h2 className="script-title">Nikkah</h2>
        </header>
        <p className="nikkah__date">Sunday, 04 October 2026</p>
        <p className="nikkah__time">After Namaz-e-Maghrib</p>
        <Ornament />
        <p className="nikkah__place">Memon Masjid (Pahariwali)</p>
        <p className="nikkah__address">Shaheed-e-Millat Road, Karachi.</p>
        <a className="btn btn--ghost" href={NIKKAH_MAPS_LINK} target="_blank" rel="noopener noreferrer" aria-label="Find Memon Masjid Pahariwali on Google Maps">
          <PinIcon /> Masjid Location
        </a>
      </section>

      {/* 6 — Awaiting */}
      <footer className="closing reveal">
        <Ornament />
        <p className="script-title closing__title">Awaiting to welcome</p>
        <p className="closing__name">Muzammil Shahid Lobaniya</p>
        <p className="closing__family">&amp; All Lobaniya Family Members</p>
        <div className="closing__phones">
          <a href="tel:+923462255093">0346-2255093</a>
          <a href="tel:+923331308802">0333-1308802</a>
        </div>
        <p className="closing__dua">We look forward to celebrating with you.</p>
        <p className="credit">
          Made by{' '}
          <a href="https://ahmed-razas-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">Ahmed Raza</a>
        </p>
      </footer>
    </main>
  );
}
