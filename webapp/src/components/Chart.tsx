import React, { useMemo } from 'react';
import { LinePath, Line } from '@visx/shape';
import { scaleLinear, scaleUtc } from '@visx/scale';

const Chart = () => {
  // The X axis is a time series scale, which is a d3 scale for automatic generation of a sensible scale
  const dateScale = useMemo(
    () =>
      scaleUtc({
        // Start and end points depend on how much margin space is defined
        range: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        ],
        domain: [1, 100],
        nice: true,
        clamp: true,
      }),
    []
  );

  // The Y axis is a scale that depends on the input data values.
  const sohScale = useMemo(
    () =>
      scaleLinear({
        range: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        ],
        domain: [1, 100],
      }),
    []
  );
  return (
    <div className="w-[70%] h-[35%] border-2 border-secondary-neutral">
      <LinePath
        stroke="#DDDDDD"
        strokeWidth={2}
        data={sohScale.ticks(24)}
        strokeDasharray={4}
        markerStart="url(#marker-circle-start)"
        markerMid="url(#marker-circle)"
        markerEnd="url(#marker-circle)"
      />
    </div>
  );
};

export default Chart;
