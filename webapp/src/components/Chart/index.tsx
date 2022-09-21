import React, { useMemo } from 'react';
import { LinePath, Line, Polygon } from '@visx/shape';
import { scaleLog, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';

export interface ChartProps {
  height: number;
  width: number;
  data: any;
}

const Chart = ({ width, height, data }: ChartProps) => {
  // Margin applied to chart to ensure axis are visible
  const marginTop = 10;
  const marginLeft = 40;
  const marginRight = 20;
  const marginBottom = 20;

  // Inner width and height of the charts
  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  const axisLeft = useMemo(
    () =>
      scaleLog({
        range: [innerHeight, 1],
        domain: [1, 1000],
      }),
    []
  );

  const axisBottom = useMemo(
    () =>
      scaleTime({
        range: [marginLeft, innerWidth],
        domain: [new Date('2022-08-08T00:00:00'), new Date('2022-08-10T00:00:00')],
      }),
    []
  );

  return (
    <svg width={width} height={height}>
      {/* <rect stroke="#ffffff" width={innerWidth} height={innerHeight} x={marginLeft} y={marginTop} /> */}
      <AxisLeft
        scale={axisLeft}
        left={marginLeft}
        top={marginTop}
        stroke="#FAFAFA"
        tickStroke="#FAFAFA"
        numTicks={1}
        tickLength={8}
        tickFormat={(v) => {
          const asString = `£${v}`;
          // label only major ticks
          return asString;
          // return asString.match(/^[.01?[\]]*$/) ? asString : '';
        }}
        tickLabelProps={() => ({
          fill: '#FAFAFA',
          fontSize: 10,
          // y: -2.5,
        })}
      />
      <AxisBottom
        scale={axisBottom}
        top={height - marginBottom}
        left={marginLeft}
        numTicks={2}
        tickLength={4}
        stroke="#FAFAFA"
        tickStroke="#FAFAFA"
        tickLabelProps={() => ({
          fill: '#FAFAFA',
          fontSize: 10,
          textAnchor: 'middle',
        })}
      />
      {/* This is excluded right now until backend produces an array of all prices. */}
      <LinePath<number>
        stroke="#ffffff"
        fill="#ffffff"
        strokeWidth={2}
        data={data}
        x={(d) => {
          console.log(data, d);
          return axisBottom(d) ?? 0;
        }}
        y={(d) => axisLeft(d) ?? 0}
      />
      <Polygon
        fill="green"
        center={{ x: innerWidth - data / 2, y: innerHeight - data / 5 }}
        sides={500}
        className="z-50"
        stroke="none"
      />
      <Line
        from={{ x: marginLeft, y: marginTop }}
        to={{ x: innerWidth - data / 2, y: innerHeight - data / 5 }}
        stroke="#ffffff"
      />
    </svg>
  );
};

export default React.memo(Chart);
