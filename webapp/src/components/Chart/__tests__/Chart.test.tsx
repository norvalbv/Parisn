import { FC } from 'react';
import renderer from 'react-test-renderer';

import Chart, { ChartProps } from '../';

const ChartWithRequiredProps: FC<Required<ChartProps>> = Chart;

describe('<Chart />', () => {
  test('Chart props with mandatory props', () => {
    const tree = renderer.create(<Chart height={100} width={100} data={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Chart props with all props as required', () => {
    const tree = renderer
      .create(<ChartWithRequiredProps height={100} width={100} data={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
