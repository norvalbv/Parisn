import { cn } from '@/lib/utils/cn';
import Header from '@/src/components/Header';
import StyledLink from '@/src/components/StyledLink';
import { ReactElement } from 'react';

type ItemSectionProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  isReversed?: boolean;
  href?: string;
};

const ItemSection = ({
  imageSrc,
  imageAlt,
  title,
  description,
  isReversed = false,
  href,
}: ItemSectionProps): ReactElement => {
  return (
    <div className="min-h-svh sm:min-h-[50rem] 2xl:min-h-[40rem] flex items-center py-8 lg:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 sm:gap-4 sm:p-6 md:w-4/5 md:flex-row md:p-12">
        <div className={cn('flex flex-1 justify-center', isReversed && 'md:order-2')}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-[15.625rem] rounded-xl object-cover sm:w-[18.75rem] md:h-[20rem] md:w-[20rem]"
          />
        </div>
        <div
          className={cn(
            'flex-1 px-4 text-center sm:px-0 md:text-left',
            isReversed ? 'md:order-1' : ''
          )}
        >
          <Header title={title} />
          <p className="w-full">{description}</p>
          {href && <StyledLink href={href} />}
        </div>
      </div>
    </div>
  );
};

export default ItemSection;
