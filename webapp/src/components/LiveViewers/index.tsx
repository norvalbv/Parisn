import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

export interface LiveViewersProps {
  params?: string;
}

const LiveViewers = ({ params }: LiveViewersProps) => {
  const [searchParams] = useSearchParams();
  const itemParams = searchParams.get('product') || undefined;

  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (!params) {
      socket.emit('join room', itemParams, (amount: number) => {
        return setViewCount(amount);
      });
    } else {
      socket.emit('get room', params, (amount: number) => {
        return setViewCount(amount);
      });
    }
  }, []);

  return <p className="text-sm z-10">Live viewers: {viewCount}</p>;
};

export default React.memo(LiveViewers);
