import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FontSize, fontSizeMap } from '../../types/tailwind';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

export interface LiveViewersProps {
  classNames?: string;
  fontSize?: FontSize;
  label?: string | JSX.Element;
  /**
   * Params for page
   */
  pageParams?: string;
  /**
   * Other params, i.e, product ID.
   */
  params?: string;
}

const LiveViewers = ({
  classNames,
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
    <p className={`${fontSizeMap[fontSize]} ${classNames} z-10`}>
      {label} {viewCount}
    </p>
  );
};

export default React.memo(LiveViewers);
