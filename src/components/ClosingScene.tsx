import { useEffect, useRef } from 'react';
import { MAPS_LINK, CALENDAR_LINK } from '../config/links';
import './ClosingScene.css';

export default function ClosingScene() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sceneRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => {
      if (prefersReducedMotion) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);


  return (
    <section ref={sceneRef} className="closing-scene" aria-label="Plan your visit">
      <div className="closing-scene__container">
        
        <div className="closing-scene__header fade-up">
          <p className="closing-scene__message">
            We look forward to celebrating with you.
          </p>
        </div>

        <div className="plan-inserts">
          
          {/* Left Insert: Calendar */}
          <div className="plan-insert fade-up">
            <h3 className="plan-insert__title">October 2026</h3>
            <div className="mini-calendar" aria-hidden="true">
              <div className="mini-calendar__header">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
              <div className="mini-calendar__grid">
                <span></span><span></span><span></span><span></span><span>1</span><span>2</span><span>3</span>
                <span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span className="mini-calendar__highlight">10</span>
                <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span>
                <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span>
                <span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
              </div>
            </div>
            
            <p className="plan-insert__schedule">
              Gathering 9:00 PM <span className="dot">·</span> Dinner 10:00 PM
            </p>
            
            <a 
              className="plan-insert__btn" 
              href={CALENDAR_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Add Wedding Ceremony to Google Calendar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Add to Calendar
            </a>
          </div>

          {/* Right Insert: Map */}
          <div className="plan-insert fade-up delay-200">
            <h3 className="plan-insert__title">Carnation Banquet</h3>
            <div className="plan-insert__map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3000!2d67.078!3d24.868!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ea5b106bb17%3A0x2ce489e7b66007a5!2sCarnation%20Banquet%20Hall!5e0!3m2!1sen!2sus!4v1" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps embed showing Carnation Banquet"
              ></iframe>
            </div>
            
            <a 
              className="plan-insert__btn" 
              href={MAPS_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Get directions to Carnation Banquet on Google Maps"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Open Directions
            </a>
          </div>

        </div>
        

      </div>
    </section>
  );
}
