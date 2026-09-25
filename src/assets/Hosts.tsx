export const MaleHost = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 250" className={className}>
    {/* Shadow */}
    <ellipse cx="50" cy="245" rx="20" ry="3" fill="var(--color-ink-dark)" opacity="0.08" />
    
    {/* Head */}
    <path d="M42 20 C42 12, 58 12, 58 20 C58 28, 42 28, 42 20 Z" fill="var(--color-gold-antique)" />
    
    {/* Sherwani Body (Front facing) */}
    <path d="M30 35 C35 32, 65 32, 70 35 
             C75 40, 75 55, 75 80 L70 150 
             C70 170, 68 180, 68 180 L32 180 
             C32 180, 30 170, 30 150 L25 80 
             C25 55, 25 40, 30 35 Z" fill="var(--color-gold-antique)" fillOpacity="0.12" stroke="var(--color-gold-antique)" strokeWidth="1.5" />
    
    {/* Left Arm (Relaxed at side) */}
    <path d="M75 40 C80 60, 80 100, 73 130" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1.5" />
    
    {/* Right Arm (Greeting gesture - bent upwards across chest) */}
    <path d="M25 40 C20 60, 20 80, 30 90 C35 95, 42 90, 48 82" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1.5" />
    {/* Hand */}
    <path d="M48 82 C51 79, 54 77, 53 72" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Collar & Buttons details */}
    <path d="M45 34 C50 38, 50 38, 55 34" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1" />
    <path d="M50 36 L50 100" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Legs */}
    <path d="M40 180 L40 240 M60 180 L60 240" fill="none" stroke="var(--color-gold-antique)" strokeWidth="2" />
  </svg>
);

export const FemaleHost = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 250" className={className}>
    {/* Shadow */}
    <ellipse cx="60" cy="245" rx="35" ry="4" fill="var(--color-ink-dark)" opacity="0.08" />
    
    {/* Head */}
    <path d="M52 20 C52 12, 68 12, 68 20 C68 28, 52 28, 52 20 Z" fill="var(--color-gold-antique)" />
    
    {/* Upper Body (Front facing) */}
    <path d="M45 40 C50 35, 70 35, 75 40 
             C80 48, 80 65, 75 75 
             C70 82, 50 82, 45 75 
             C40 65, 40 48, 45 40 Z" fill="var(--color-gold-antique)" fillOpacity="0.18" stroke="var(--color-gold-antique)" strokeWidth="1.5" />
             
    {/* Flowing Skirt */}
    <path d="M45 70 C50 75, 70 75, 75 70 
             C85 130, 100 220, 105 240 
             L15 240 
             C20 220, 35 130, 45 70 Z" fill="var(--color-gold-antique)" fillOpacity="0.1" stroke="var(--color-gold-antique)" strokeWidth="1.5" />

    {/* Right Arm (Greeting gesture - bent upwards) */}
    <path d="M42 42 C35 60, 35 80, 45 90 C50 95, 55 90, 60 85" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1.5" />
    <path d="M60 85 C62 82, 65 79, 64 75" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Left Arm (Relaxed) */}
    <path d="M78 42 C85 65, 85 95, 78 120" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1.5" />
    
    {/* Dupatta/Fabric Drapes */}
    <path d="M35 45 C20 70, 15 150, 25 230" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8"/>
    <path d="M85 45 C100 70, 105 150, 95 230" fill="none" stroke="var(--color-gold-antique)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8"/>
  </svg>
);
