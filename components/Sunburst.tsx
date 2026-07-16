export interface SunburstProps {
  /** Any CSS color. Defaults to the gold brand token. */
  color?: string;
  /** Fill opacity, kept low so the motif stays decorative. */
  opacity?: number;
  /** Rotation in degrees applied around the motif center. */
  rotation?: number;
  className?: string;
  /** Number of rays in the half circle. */
  rays?: number;
}

const CENTER_X = 100;
const CENTER_Y = 100;
const INNER_RADIUS = 16;
const OUTER_RADIUS = 96;

function toPoint(angleDeg: number, radius: number): string {
  const rad = (angleDeg * Math.PI) / 180;
  const x = CENTER_X + radius * Math.cos(rad);
  const y = CENTER_Y - radius * Math.sin(rad);
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}

/*
  Sunburst is a decorative half circle of tapering rays inspired by the ASAH
  logo sun. The rays are generated programmatically, not traced from the logo.
  It is purely decorative and hidden from assistive technology.
*/
export function Sunburst({
  color = "var(--color-gold)",
  opacity = 0.15,
  rotation = 0,
  className = "",
  rays = 12,
}: SunburstProps) {
  const step = 180 / rays;
  const halfWidth = step * 0.3;

  const wedges = Array.from({ length: rays }, (_, index) => {
    const center = (index + 0.5) * step;
    const baseStart = toPoint(center - halfWidth, INNER_RADIUS);
    const baseEnd = toPoint(center + halfWidth, INNER_RADIUS);
    const apex = toPoint(center, OUTER_RADIUS);
    return `${baseStart} ${apex} ${baseEnd}`;
  });

  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform={`rotate(${rotation} ${CENTER_X} ${CENTER_Y})`}
        fill={color}
        opacity={opacity}
      >
        {wedges.map((points, index) => (
          <polygon key={index} points={points} />
        ))}
      </g>
    </svg>
  );
}
