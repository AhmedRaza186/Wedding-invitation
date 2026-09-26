export const Monogram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-gold-light)" />
        <stop offset="50%" stopColor="var(--color-gold)" />
        <stop offset="100%" stopColor="var(--color-gold-dark)" />
      </linearGradient>
    </defs>
    {/* Thin outer ring */}
    <circle cx="50" cy="50" r="48" fill="var(--color-cocoa-900)" stroke="url(#gold-grad)" strokeWidth="1" />
    
    {/* Decorative Side Lines matching the original image */}
    <path d="M-10,40 L15,48 M-10,50 L10,53 M-10,60 L20,55" fill="none" stroke="url(#gold-grad)" strokeWidth="0.8" opacity="0.6"/>
    <path d="M110,40 L85,48 M110,50 L90,53 M110,60 L80,55" fill="none" stroke="url(#gold-grad)" strokeWidth="0.8" opacity="0.6"/>

    {/* M */}
    <text 
      x="38" 
      y="55" 
      fontFamily="'Great Vibes', cursive" 
      fontSize="44" 
      fill="url(#gold-grad)" 
      textAnchor="middle"
    >
      M
    </text>

    {/* I */}
    <text 
      x="62" 
      y="68" 
      fontFamily="'Great Vibes', cursive" 
      fontSize="44" 
      fill="url(#gold-grad)" 
      textAnchor="middle"
    >
      I
    </text>
  </svg>
);
