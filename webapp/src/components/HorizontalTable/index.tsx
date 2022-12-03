import { ReactElement } from 'react';
import { FontSize, fontSizeMap, FontWeight, fontWeightMap } from '../../types/tailwind';

// This is not a table as react-table cannot be converted into a horizontal table without some serious inner refactoring.
// Read more: https://github.com/TanStack/table/issues/49
// Also note: That the bottom solution is outdated and there is no up-to-date solution.

type HorizontalTableProps = {
  title: {
    TitleLabel: string;
    TitleClassNames?: string;
    TitleFontWeight?: FontWeight;
    TitleFontSize?: FontSize;
  };
  value: {
    ValueLabel: JSX.Element | JSX.Element[] | string | number | null;
    ValueClassNames?: string;
    ValueFontWeight?: FontWeight;
    ValueFontSize?: FontSize;
  };

  widths?: { title: string; value: string };
  requirePadding?: boolean;
};

const HorizontalTable = ({
  title: { TitleLabel = '', TitleClassNames = '', TitleFontWeight = 'bold', TitleFontSize = 'sm' },
  value: {
    ValueLabel = '',
    ValueClassNames = '',
    ValueFontWeight = 'normal',
    ValueFontSize = 'sm',
  },
  widths = { title: 'w-2/5', value: 'w-3/5' },
  requirePadding = true,
}: HorizontalTableProps): ReactElement => {
  return (
    <div className="flex text-xs group">
      <div
        className={`border-t group-last:border-b border-l border-white bg-neutral-60 p-4 leading-[1.145]
        ${widths.title}
        ${fontSizeMap[TitleFontSize]}
        ${fontWeightMap[TitleFontWeight]}
        ${TitleClassNames}`}
      >
        {TitleLabel}
      </div>
      <div
        className={`border-t group-last:border-b border-x border-neutral-60 leading-[1.145] ${
          requirePadding ? 'p-4' : ''
        } ${widths.value} ${fontSizeMap[ValueFontSize]} ${
          fontWeightMap[ValueFontWeight]
        } ${ValueClassNames}`}
      >
        {ValueLabel}
      </div>
    </div>
  );
};

export default HorizontalTable;
