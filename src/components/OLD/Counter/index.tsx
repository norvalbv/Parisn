//@ts-nocheck

import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Counter = (): ReactElement => {
  const [timeLeft, setTimeLeft] = useState({ total: 600000, minutes: 10, seconds: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const getTimeLeft = localStorage.getItem('timeLeft') || '0';
    const parsed = JSON.parse(getTimeLeft) as number;

    let initialValue = parsed !== 0 ? parsed : 600000;

    if (initialValue) {
      const timer = setInterval(() => {
        initialValue -= 1000;

        const minutes = Math.floor((initialValue / 1000 / 60) % 60);
        const seconds = Math.floor((initialValue / 1000) % 60);

        setTimeLeft({
          total: initialValue,
          minutes,
          seconds,
        });

        localStorage.setItem('timeLeft', JSON.stringify(initialValue));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (timeLeft.total === 1000) {
      localStorage.clear();
      navigate('/collections');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft.total]);

  return (
    <div className="mt-4 italic tracking-wide text-secondary-blue/90">
      Item held in basket for:&nbsp;
      <span className="text-3xl">
        <span>{timeLeft.minutes}</span>
      </span>
      {timeLeft.minutes > 1 ? 'minutes' : 'minute'}&nbsp;
      <span className="text-3xl">
        <span>{timeLeft.seconds}</span>
      </span>
      {timeLeft.seconds > 1 ? 'seconds' : 'minute'}
    </div>
  );
};

export default Counter;
