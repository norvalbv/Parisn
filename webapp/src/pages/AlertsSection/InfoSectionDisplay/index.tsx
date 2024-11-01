import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement, useMemo } from 'react';
import AlertsSection from '../DataPoints/Alerts';
import CustomLimits from '../DataPoints/CustomLimits';
import Transactions from '../DataPoints/Transactions';
import { ActiveSection } from '../InfoSection';

type InfoSectionDisplayProps = {
  activeSection: ActiveSection;
};

const InfoSectionDisplay = ({ activeSection }: InfoSectionDisplayProps): ReactElement => {
  const section = useMemo(() => {
    switch (activeSection) {
      case 'limits':
        return <CustomLimits />;
      case 'alerts':
        return <AlertsSection />;
      case 'transactions':
        return <Transactions />;
      default:
        return null;
    }
  }, [activeSection]);

  return (
    <div className="sticky top-0 flex h-screen w-full items-center justify-center max-lg:hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-full max-h-[70vh] w-full max-w-4xl px-4 sm:px-0"
        >
          {section}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InfoSectionDisplay;
