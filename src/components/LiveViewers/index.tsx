import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FontSize, fontSizeMap } from 'types';

const socket = io('ws://localhost:8000', {
  withCredentials: true,
});

export type LiveViewersProps = {
  className?: string;
  fontSize?: FontSize;
  label?: string | JSX.Element;
  /**
   * Params for page
   */
  pageParams?: string;
  /**
   * Other params, i.e, product id.
   */
  params?: string;
};

const LiveViewers = ({
  className,
  fontSize = 'xs',
  label = 'Live viewers:',
  pageParams,
  params,
}: LiveViewersProps): ReactElement => {
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
  }, [pageParams, params]);

  return (
    <p className={clsx(fontSizeMap[fontSize], className)}>
      {label} {viewCount}
    </p>
  );
};

export default React.memo(LiveViewers);
