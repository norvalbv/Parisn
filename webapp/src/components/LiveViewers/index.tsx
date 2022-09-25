import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

export interface LiveViewersProps {
  params?: string;
}

const LiveViewers = ({ params }: LiveViewersProps) => {
  const [searchParams] = useSearchParams();
  const itemParams = searchParams.get('product') || '';

  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (!params) {
      socket.emit('join room', itemParams, (amount: number) => {
        // console.log(amount);
        return setViewCount(amount);
      });
    } else {
      socket.emit('get room', params, (amount: number) => {
        // console.log(amount);
        return setViewCount(amount);
      });
    }

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // if (params) console.log(viewCount, 'live viewers');

  return <p className="text-sm">Live viewers: {viewCount}</p>;
};

export default React.memo(LiveViewers);
