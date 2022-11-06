import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FontSize, fontSizeMap } from '../../types/tailwind';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

export interface LiveViewersProps {
  fontSize?: FontSize;
  label?: string;
  pageParams?: string;
  params?: string;
}

const LiveViewers = ({
  fontSize = 'md',
  label = 'Live viewers:',
  pageParams,
  params,
}: LiveViewersProps) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (!params) {
      socket.emit('get room count', pageParams, (amount: number) => {
        return setViewCount(amount);
      });
    } else {
      socket.emit('get all room counts', params, (amount: number) => {
        return setViewCount(amount);
      });
    }
  }, []);

  return (
    <p className={`${fontSizeMap[fontSize]} z-10`}>
      {label} {viewCount}
    </p>
  );
};

export default React.memo(LiveViewers);
