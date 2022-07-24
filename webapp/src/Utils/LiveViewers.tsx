import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000', {
  withCredentials: true,
  transports: ['websocket', 'polling', 'flashsocket'],
});

const LiveViewers = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    // // emit:
    socket.emit('eventName', () => {
      console.log('test');
    });

    // listen to events from sever:
    socket.on('eventName', (socket) => {
      console.log(socket);
    });
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  };

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
};

export default LiveViewers;
