import "./ProgressBar.scss";

function clampProgress(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return Math.round(value);
}

export default function ProgressBar({ progress = 0 }) {
  const safeProgress = clampProgress(progress);

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeProgress}
      aria-label="Progression"
    >
      <div
        className="progress-bar__fill"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}