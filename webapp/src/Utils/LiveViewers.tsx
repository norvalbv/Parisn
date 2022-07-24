import React, { useState } from 'react';
import io from 'socket.io-client';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

const LiveViewers = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [viewCount, setViewCount] = useState(0);

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on('connect', function () {
    console.log('Connected to socket.io server');
    setIsConnected(true);
    socket.on('get viewers', (amount) => {
      console.log(amount);
      setViewCount(amount);
    });
  });

  socket.emit('connection', 1);

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>View count: {viewCount}</p>
    </div>
  );
};

export default LiveViewers;
