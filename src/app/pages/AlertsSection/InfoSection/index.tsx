'use client';

import Header, { HeaderProps } from '@/components/ui/Header';
import { ReactElement, useMemo, useState, useEffect } from 'react';
import CustomLimits from '../DataPoints/CustomLimits';
import Transactions from '../DataPoints/Transactions';
import Alerts from '../DataPoints/Alerts';
import useWindowSize from '@/hooks/useWindowSize';

export type ActiveSection = 'limits' | 'alerts' | 'transactions';

type DetailsProps = {
  description: string;
  activeSection: ActiveSection;
} & HeaderProps;

const InfoSection = ({
  description,
  activeSection,
  ...headerProps
}: DetailsProps): ReactElement => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width < 1024);
  }, [width]);

  const section = useMemo(() => {
    switch (activeSection) {
      case 'limits':
        return <CustomLimits />;
      case 'alerts':
        return <Alerts />;
      case 'transactions':
        return <Transactions />;
    }
  }, [activeSection]);

  return (
    <div className="flex w-full flex-col items-center justify-between gap-8 sm:px-8 lg:gap-0">
      <div className="flex flex-col gap-8 lg:gap-0">
        <Header {...headerProps} size="lg" />
        <p className="mb-6 text-gray-500">{description}</p>
      </div>
      {isMobile && section}
    </div>
  );
};

export default InfoSection;
