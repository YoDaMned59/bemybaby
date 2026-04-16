export default function ProgressBar({ percent }) {
    return (
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="fill"></div>
      </div>
    );
  }