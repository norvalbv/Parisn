import React, { useState } from 'react';
import io from 'socket.io-client';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

const LiveViewers = () => {
  const [viewCount, setViewCount] = useState(0);

  socket.on('get viewers', (amount) => setViewCount(amount));

  return (
    <div>
      <p>Live viewers: {viewCount}</p>
    </div>
  );
};

export default LiveViewers;
