import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000', {
  transports: ['websocket'],
  withCredentials: true,
});

const LiveViewers = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on('connect', function () {
    console.log('Connected to socket.io server');
  });

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
    </div>
  );
};

export default LiveViewers;
