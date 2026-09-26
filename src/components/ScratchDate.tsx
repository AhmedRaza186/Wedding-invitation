import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  onReveal?: () => void;
}

const BRUSH = 22;
const CLEAR_THRESHOLD = 0.5;

/** One gold scratch panel hiding the full wedding date. */
export default function ScratchDate({ onReveal }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const touched = useRef(false);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    onReveal?.();
  }, [onReveal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !wrap || !ctx) return;

    const draw = () => {
      if (touched.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width: w, height: h } = wrap.getBoundingClientRect();
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#9c7a3c');
      grad.addColorStop(0.25, '#ecd08f');
      grad.addColorStop(0.5, '#c9a45c');
      grad.addColorStop(0.75, '#f3dca4');
      grad.addColorStop(1, '#8a6a30');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // brushed-metal sheen
      ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
      for (let x = -h; x < w + h; x += 11) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 4, 0);
        ctx.lineTo(x + 4 - h, h);
        ctx.lineTo(x - h, h);
        ctx.closePath();
        ctx.fill();
      }

      ctx.strokeStyle = 'rgba(61, 38, 26, 0.55)';
      ctx.lineWidth = 1;
      ctx.strokeRect(8.5, 8.5, w - 17, h - 17);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#3d261a';
      ctx.font = '600 13px "Cinzel", Georgia, serif';
      ctx.fillText('✦  SCRATCH HERE  ✦', w / 2, h / 2 - 12);
      ctx.font = 'italic 16px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('to reveal the blessed date', w / 2, h / 2 + 14);
    };

    draw();
    document.fonts?.ready.then(draw);
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  const clearedRatio = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++;
      if (data[i] < 40) clear++;
    }
    return clear / total;
  };

  const pointFrom = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratchTo = (p: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const from = lastPoint.current ?? p;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = BRUSH * 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(p.x + 0.01, p.y);
    ctx.stroke();
    lastPoint.current = p;

    if (++moves.current % 6 === 0 && clearedRatio(ctx, canvas) > CLEAR_THRESHOLD) reveal();
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (!touched.current) navigator.vibrate?.(12);
    touched.current = true;
    lastPoint.current = null;
    scratchTo(pointFrom(e));
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
    scratchTo(pointFrom(e));
  };

  const onUp = () => {
    lastPoint.current = null;
  };

  return (
    <div className="scratch">
      <div ref={wrapRef} className={`scratch__card ${revealed ? 'is-revealed' : ''}`}>
        <div className="scratch__date" aria-label="Saturday, 10 October 2026">
          <span className="scratch__day">Saturday</span>
          <span className="scratch__row">
            <span className="scratch__side">October</span>
            <strong className="scratch__num gold-text">10</strong>
            <span className="scratch__side">2026</span>
          </span>
          <span className="scratch__time">Gathering 9:00 PM</span>
        </div>
        <canvas
          ref={canvasRef}
          className="scratch__canvas"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          aria-hidden="true"
        />
        {revealed && (
          <div className="scratch__burst" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <i key={i} style={{ '--a': `${(360 / 14) * i}deg`, '--d': `${60 + (i % 3) * 22}px` } as React.CSSProperties} />
            ))}
          </div>
        )}
      </div>
      {!revealed && (
        <button type="button" className="scratch__skip" onClick={reveal}>
          or tap to reveal
        </button>
      )}
    </div>
  );
}
