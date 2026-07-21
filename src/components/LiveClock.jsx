import React, { useEffect, useState } from 'react';
import { formatFullDate, formatTime } from '../utils/formatDate';

export default function LiveClock({ compact = false }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (compact) {
    return <span className="hero-clock">{formatTime(now)}</span>;
  }

  return (
    <div>
      <div className="hero-clock">{formatTime(now)}</div>
      <div className="hero-date">{formatFullDate(now)}</div>
    </div>
  );
}
