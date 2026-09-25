export const Arch = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 800" className={className} preserveAspectRatio="xMidYMax slice">
    <defs>
      <filter id="archShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="15" floodColor="#1a1814" floodOpacity="0.12"/>
      </filter>
    </defs>
    <path d="M0,800 L0,0 L400,0 L400,800 L350,800 L350,300 C350,150 250,80 200,80 C150,80 50,150 50,300 L50,800 Z" fill="var(--color-ivory-paper)" filter="url(#archShadow)" />
    
    <path d="M65,800 L65,305 C65,165 145,100 200,100 C255,100 335,165 335,305 L335,800" fill="none" stroke="var(--color-gold-antique)" strokeWidth="2" />
    <path d="M75,800 L75,310 C75,175 150,110 200,110 C250,110 325,175 325,310 L325,800" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1" opacity="0.6" />
    
    <path d="M50,300 C50,150 150,80 200,80 C250,80 350,150 350,300 L350,800 L330,800 L330,305 C330,165 240,105 200,105 C160,105 70,165 70,305 L70,800 L50,800 Z" fill="var(--color-gold-antique)" opacity="0.04" />
  </svg>
);
