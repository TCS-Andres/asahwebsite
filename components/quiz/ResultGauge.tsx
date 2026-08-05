export interface ResultGaugeProps {
  /** Needle position from 0 (left) to 1 (right). */
  value: number;
  /** Short label shown under the arc, for example "Moderate range". */
  zoneLabel: string;
  /** Optional detail line, for example "Score 12 of 24". */
  detail?: string;
}

const RADIUS = 80;
const CX = 100;
const CY = 100;

/* Point on the gauge circle for an angle in degrees, 180 is left, 0 is right. */
function point(angleDeg: number, radius = RADIUS): [number, number] {
  const t = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.cos(t), CY - radius * Math.sin(t)];
}

/* A stroked arc path from angle a1 to a2, sweeping over the top. */
function arc(a1: number, a2: number): string {
  const [x1, y1] = point(a1);
  const [x2, y2] = point(a2);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${RADIUS} ${RADIUS} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/*
  A semicircular result gauge. The colored zones run sage to gold to terracotta
  and the needle sits at the reader's result. Whatever the position, the gauge
  carries a clear recommendation to book an evaluation, since a professional
  look is worthwhile even at the lower end. Pure SVG, no client state.
*/
export function ResultGauge({ value, zoneLabel, detail }: ResultGaugeProps) {
  const v = Math.max(0, Math.min(1, value));
  const angle = 180 - v * 180;
  const [nx, ny] = point(angle, RADIUS - 15);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 200 116"
        className="w-full max-w-[300px]"
        role="img"
        aria-label={`Screening result: ${zoneLabel}. An evaluation is recommended.`}
      >
        {/* Track */}
        <path
          d={arc(180, 0)}
          fill="none"
          stroke="var(--color-sage)"
          strokeOpacity="0.15"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Zones */}
        <path d={arc(178, 122)} fill="none" stroke="var(--color-sage)" strokeWidth="14" strokeLinecap="round" />
        <path d={arc(118, 62)} fill="none" stroke="var(--color-gold)" strokeWidth="14" strokeLinecap="round" />
        <path d={arc(58, 2)} fill="none" stroke="var(--color-terracotta)" strokeWidth="14" strokeLinecap="round" />
        {/* Needle */}
        <line
          x1={CX}
          y1={CY}
          x2={nx.toFixed(2)}
          y2={ny.toFixed(2)}
          stroke="var(--color-forest)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r="6.5" fill="var(--color-forest)" />
        <circle cx={CX} cy={CY} r="2.5" fill="var(--color-cream)" />
      </svg>

      <p className="mt-1 font-display text-2xl text-forest">{zoneLabel}</p>
      {detail ? <p className="text-small mt-1 text-ink/60">{detail}</p> : null}

      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-terracotta/12 px-5 py-2.5 text-terracotta">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 2v4M16 2v4M3 10h18" />
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="m9 16 2 2 4-4" />
        </svg>
        <span className="text-small font-semibold">
          An evaluation is recommended
        </span>
      </div>
    </div>
  );
}
