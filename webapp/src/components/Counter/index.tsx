import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Counter = () => {
  const [timeLeft, setTimeLeft] = useState({ total: 0, minutes: 0, seconds: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const getTimeLeft = localStorage.getItem('timeLeft');
    const parsed: number = JSON.parse(getTimeLeft || '0');

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
      console.log('logged');
      localStorage.clear();
      navigate('/catalogue');
    }
  }, [timeLeft.total]);

  return (
    <div className="text-secondary-blue -my-4 italic">
      Item held in basket for:{' '}
      <div className="flex gap-5">
        <div>
          <span className="countdown font-mono text-4xl">
            <span>{timeLeft.minutes}</span>
          </span>
          min
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span>{timeLeft.seconds}</span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default Counter;
