import './PrintedWeddingCard.css'
import cardReference from '../assets/card-reference.jpg'
import cornerRoses from '../assets/corner_roses.jpg'
import { MAPS_LINK, CALENDAR_LINK } from '../config/links'

/** The invitation text is transcribed from the client's printed card. */
export default function PrintedWeddingCard() {
  return (
    <article className="printed-card" aria-label="Wedding invitation for Marium and Muhammad Ibrahim">
      <div className="printed-card__outline" aria-hidden="true" />
      
      {/* Real watercolor floral corners */}
      <img src={cornerRoses} alt="" className="printed-card__floral printed-card__floral--top-left" aria-hidden="true" />
      <img src={cornerRoses} alt="" className="printed-card__floral printed-card__floral--top-right" aria-hidden="true" />
      <img src={cornerRoses} alt="" className="printed-card__floral printed-card__floral--bottom-left" aria-hidden="true" />
      <img src={cornerRoses} alt="" className="printed-card__floral printed-card__floral--bottom-right" aria-hidden="true" />

      <div className="printed-card__content">
        <div className="printed-card__opening-view">
          <p className="printed-card__bismillah" lang="ar" dir="rtl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>

          <header className="printed-card__introduction">
            <p>The family members of</p>
            <p className="printed-card__emphasis">Mr. Muhammad Ishaq Lobaniya (Late)</p>
            <p>request the honour of your presence at the</p>
            <h2>Wedding Ceremony</h2>
            <p>of their beloved grand daughter</p>
          </header>

          <div className="printed-card__couple">
            <h1>Marium</h1>
            <p>D/O Mr. &amp; Mrs. Muhammad Shahid Lobaniya</p>
            <span className="printed-card__with">with</span>
            <h1>Muhammad Ibrahim</h1>
            <p>S/O Mr. &amp; Mrs. Muhammad Shakeel Ismail Karachi Wala</p>
          </div>
        </div>

        {/* Elegant Transition to push the date below fold on tall screens */}
        <div className="printed-card__transition" aria-hidden="true">
          <div className="printed-card__transition-line"></div>
          <svg className="printed-card__transition-ornament" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 12L12 22L9 12L12 2Z" />
          </svg>
        </div>

        <section className="printed-card__wedding" aria-label="Wedding ceremony details">
          <div className="printed-card__date-container">
            <div className="printed-card__date" aria-label="Saturday 10 October 2026">
              <span className="printed-card__date-side">Saturday</span>
              <span className="printed-card__date-center"><span>On</span><strong>10</strong><span>2026</span></span>
              <span className="printed-card__date-side">October</span>
            </div>
            <a 
              className="printed-card__action" 
              href={CALENDAR_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Add Wedding Ceremony to Google Calendar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Add to Calendar
            </a>
          </div>

          <div className="printed-card__venue-row">
            <div className="printed-card__qr" aria-label="Venue QR code reproduced from the original printed card">
              <span>Venue</span>
              <div className="printed-card__qr-window" aria-hidden="true">
                <img src={cardReference} width="1600" height="1071" alt="" />
              </div>
              <span>Location</span>
            </div>
            <div className="printed-card__venue-copy">
              <p className="printed-card__venue-title"><span>At:</span> Carnation Banquet</p>
              <p>Main Shahrah-e-Faisal, Karachi.</p>
              <p className="printed-card__schedule">Gathering: 9:00 PM <span aria-hidden="true">|</span> Dinner: 10:00 PM</p>
              <a 
                className="printed-card__action" 
                href={MAPS_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Get directions to Carnation Banquet on Google Maps"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Get Directions
              </a>
            </div>
          </div>
        </section>

        <section className="printed-card__nikkah" aria-label="Separate Nikkah ceremony">
          <h2>Nikkah</h2>
          <p>On Sunday, 04 Oct. 2026</p>
          <p>After Namaz e Maghrib</p>
          <p>At Memon Masjid (Pahariwali)</p>
          <p>Shaheed e Millat Road, Karachi.</p>
        </section>

        <footer className="printed-card__footer">
          <p>Awaiting to welcome</p>
          <p>Muzammil Shahid Lobaniya</p>
          <p>All Lobaniya Family Members</p>
          <p><a href="tel:+923462255093">0346-2255093</a> <span aria-hidden="true">|</span> <a href="tel:+923331308802">0333-1308802</a></p>
        </footer>
      </div>
    </article>
  )
}
