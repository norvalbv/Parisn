import { ReactElement } from 'react';
import StyledLink from '@/src/components/StyledLink';

type ItemSectionProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  isReversed?: boolean;
  showLink?: boolean;
};

const ItemSection = ({
  imageSrc,
  imageAlt,
  title,
  description,
  isReversed = false,
  showLink = false,
}: ItemSectionProps): ReactElement => {
  return (
    <div className="flex h-screen items-center">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:gap-4 sm:p-8 md:w-4/5 md:flex-row md:p-20">
        <div className={`flex flex-1 justify-center ${isReversed ? 'md:order-2' : ''}`}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-[250px] rounded-xl object-cover sm:w-[300px] md:h-[400px] md:w-[400px]"
          />
        </div>
        <div
          className={`flex-1 px-4 text-center sm:px-0 md:text-left ${
            isReversed ? 'md:order-1' : ''
          }`}
        >
          <h4 className="text-xl font-semibold uppercase tracking-wide sm:text-2xl">{title}</h4>
          <p className="mb-4 mt-2 w-full text-sm text-text-secondary sm:text-base md:mb-6 md:w-4/5">
            {description}
          </p>
          {showLink && <StyledLink href="/how-it-works#step-three" />}
        </div>
      </div>
    </div>
  );
};

export default ItemSection;
