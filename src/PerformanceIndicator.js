import { useEffect, useState } from 'react';

const EMPTY_PERFORMANCE = { grade: '—', accuracy: 0, total: 0 };

export default function PerformanceIndicator({ performance, visible }) {
  const [displayed, setDisplayed] = useState(EMPTY_PERFORMANCE);

  // Keep the last score on screen while the indicator fades out.
  useEffect(() => {
    if (performance) setDisplayed(performance);
  }, [performance]);

  const percentage = displayed.accuracy.toFixed(1);

  return (
    <aside className={`piano-performance${visible ? ' visible' : ''}`}
      aria-label="Song performance" aria-hidden={!visible} data-grade={displayed.grade}
      title="Perfect: within 80 ms. Good: within 180 ms, half credit. Missed and wrong notes lower accuracy. Grades: S 95%, A 90%, B 80%, C 70%, D 60%, F below 60%. Autoplay notes count as Perfect hits.">
      <span className="performance-grade">
        <svg className="performance-ring" viewBox="0 0 100 100" role="img" focusable="false"
          aria-label={`Rating ${displayed.grade}, accuracy ${percentage}%`}>
          <defs>
            <linearGradient id="performance-ring-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="0.45" stopColor="currentColor" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" className="performance-ring-track" />
          <circle cx="50" cy="50" r="46" className="performance-ring-arc" transform="rotate(-90 50 50)"
            pathLength="100" strokeDashoffset={100 - displayed.accuracy}
            opacity={displayed.accuracy > 0 ? 1 : 0} />
          <circle cx="50" cy="50" r="41" className="performance-ring-inner" />
          <text className="performance-grade-letter" x="50" y="50" dy="0.08em" textAnchor="middle" dominantBaseline="central">
            {displayed.grade}
          </text>
        </svg>
      </span>
      <span className="performance-accuracy" aria-label={`Accuracy ${percentage}%`}>
        <strong>{percentage}</strong>
        <span>%</span>
      </span>
    </aside>
  );
}
