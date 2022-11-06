import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

export interface LiveViewersProps {
  pageParams?: string;
  params?: string;
}

const LiveViewers = ({ params, pageParams }: LiveViewersProps) => {
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

  return <p className="text-sm z-10">Live viewers: {viewCount}</p>;
};

export default React.memo(LiveViewers);
