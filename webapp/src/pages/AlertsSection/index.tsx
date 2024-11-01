'use client';

import CardWrapper from '@/components/ui/CardWrapper';
import React, { ReactElement, useState } from 'react';
import InfoSection, { ActiveSection } from './InfoSection';
import InfoSectionDisplay from './InfoSectionDisplay';
import { Section } from './Section';

const AlertsSection = (): ReactElement => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('limits');

  return (
    <CardWrapper className="flex">
      <section className="max-lg:my-24 max-lg:flex max-lg:flex-col max-lg:gap-24">
        <Section onInView={() => setActiveSection('limits')}>
          <InfoSection
            title="Set Custom"
            highlightedText="Limits"
            description="Define spending limits with your trusted party to ensure your finances stay on track."
            inline
            activeSection="limits"
          />
        </Section>
        <Section onInView={() => setActiveSection('alerts')}>
          <InfoSection
            title="Real-Time"
            highlightedText="Alerts"
            description="Get notified immediately when spending limits are exceeded. Your trusted party will be alerted to take action."
            inline
            activeSection="alerts"
          />
        </Section>
        <Section onInView={() => setActiveSection('transactions')}>
          <InfoSection
            title="You're always in"
            highlightedText="Control"
            description="Your trusted party helps manage your finances, but only shares what you want them to."
            inline
            activeSection="transactions"
          />
        </Section>
      </section>
      <InfoSectionDisplay activeSection={activeSection} />
    </CardWrapper>
  );
};

export default AlertsSection;
