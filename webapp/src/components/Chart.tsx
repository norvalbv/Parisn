import React, { useMemo } from 'react';
import { LinePath, Line, Polygon } from '@visx/shape';
import { scaleLinear, scaleUtc } from '@visx/scale';
import { scaleLog } from 'd3-scale';
import { AxisBottom, AxisLeft } from '@visx/axis';

interface Data {}

interface ChartProps {
  height: number;
  width: number;
  data: any;
}

const Chart = ({ width, height, data }: ChartProps) => {
  // Margin applied to chart to ensure axis are visible
  const marginTop = 0;
  const marginLeft = 10;
  const marginRight = 0;
  const marginBottom = 10;

  // Inner width and ehight of the charts
  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  // const priceScale = useMemo(
  //   () =>
  //     scaleLog({
  //       domain: [1, 1000],
  //       range: [0, 100000],
  //     }),
  //   []
  // );

  const axisLeft = useMemo(
    () =>
      scaleLinear({
        range: [1, 2],
        domain: [0, 1000],
      }),
    []
  );

  const axisBottom = useMemo(
    () =>
      scaleLinear({
        range: [0, 1000],
        domain: [1, 2],
      }),
    []
  );

  return (
    <svg width={width} height={height}>
      <rect
        stroke="#ffffff"
        width={innerWidth}
        height={innerHeight}
        x={marginLeft}
        y={-marginBottom}
      />
      <AxisLeft
        scale={axisLeft}
        left={marginLeft}
        numTicks={20}
        stroke="#FAFAFA"
        tickStroke="none"
        tickLabelProps={() => ({
          fill: '#FAFAFA',
          fontSize: 10,
          textAnchor: 'middle',
        })}
      />
      <AxisBottom
        scale={axisBottom}
        top={height - 20}
        left={marginLeft}
        numTicks={2}
        stroke="#FAFAFA"
        tickStroke="#FAFAFA"
        tickLength={4}
        tickLabelProps={() => ({
          fill: '#FAFAFA',
          fontSize: 10,
          textAnchor: 'middle',
        })}
      />
      {/* <LinePath<number>
        stroke="#ffffff"
        fill="#ffffff"
        strokeWidth={2}
        data={data}
        x={priceScale(data)}
        y={priceScale(data)}
      /> */}
      <Polygon
        fill="green"
        center={{ x: width - data / 2, y: height - data / 4 }}
        sides={500}
        className="z-50"
        stroke="none"
      />
      <Line
        from={{ x: 0, y: 0 }}
        to={{ x: width - data / 2, y: height - data / 4 }}
        stroke="#ffffff"
      />
    </svg>
  );
};

export default React.memo(Chart);
