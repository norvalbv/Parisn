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
    <div className="flex h-screen items-center">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:gap-4 sm:p-8 md:w-4/5 md:flex-row md:p-20">
        <div className={cn('flex flex-1 justify-center', isReversed && 'md:order-2')}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-[15.625rem] rounded-xl object-cover sm:w-[18.75rem] md:h-[25rem] md:w-[25rem]"
          />
        </div>
        <div
          className={cn(
            'flex-1 px-4 text-center sm:px-0 md:text-left',
            isReversed ? 'md:order-1' : ''
          )}
        >
          <Header title={title} />
          <p className="mb-4 mt-2 w-full md:mb-6">{description}</p>
          {href && <StyledLink href={href} />}
        </div>
      </div>
    </div>
  );
};

export default ItemSection;
