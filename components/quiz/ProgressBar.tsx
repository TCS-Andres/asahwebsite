export interface ProgressBarProps {
  /** Completion from 0 to 1. */
  value: number;
  label?: string;
}

/*
  Slim progress bar with a terracotta fill on a soft sage track.
*/
export function ProgressBar({ value, label }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-sage/20"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Screening progress"}
      >
        <div
          className="h-full rounded-full bg-terracotta transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {label ? <p className="text-small mt-2 text-forest/70">{label}</p> : null}
    </div>
  );
}
