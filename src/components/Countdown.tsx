import { useEffect, useState } from 'react';
import { WEDDING_START } from '../config/links';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = WEDDING_START - now;
  if (left <= 0) return null;

  const units = [
    ['Days', Math.floor(left / 86_400_000)],
    ['Hours', Math.floor(left / 3_600_000) % 24],
    ['Mins', Math.floor(left / 60_000) % 60],
    ['Secs', Math.floor(left / 1000) % 60],
  ] as const;

  return (
    <div className="countdown" role="timer" aria-label="Time left until the wedding">
      {units.map(([label, value]) => (
        <div key={label} className="countdown__cell">
          <span className="countdown__value">{pad(value)}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
