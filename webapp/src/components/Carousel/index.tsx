import React, { ReactElement, useState } from 'react';

type CarouselProps = {
  images: string[];
};

const Carousel = ({ images }: CarouselProps): ReactElement => {
  const [selected, setSelected] = useState(3);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div id="default-carousel" className="relative flex h-full w-full" data-carousel="slide">
      <div className="duration-700 ease-in-out" data-carousel-item>
        <img
          src={hovered ? images[hovered] : images[selected]}
          className="pointer-events-none h-screen w-full select-none"
          alt={images[selected]}
        />
      </div>
      {/* <!-- Slider indicators --> */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-baseline justify-end space-x-2">
        {images.map((image, idx) => (
          <div
            className="px-1"
            onMouseEnter={(): void => setHovered(idx)}
            onMouseLeave={(): void => setHovered(null)}
            // eslint-disable-next-line react/no-array-index-key
            key={`${image}_${idx}`}
          >
            <img
              src={image}
              alt={image}
              onClick={(): void => setSelected(idx)}
              className={`cursor-pointer select-none rounded border ${
                hovered === idx || (hovered === null && selected === idx)
                  ? 'h-[80px] w-[60px]'
                  : 'h-[60px] w-[40px]'
              } transition-all duration-200`}
            />
          </div>
        ))}
      </div>
      {/* <!-- Slider controls --> */}
      <button
        type="button"
        className="group absolute left-0 top-0 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={(): void =>
          setSelected((selected) => (selected === 0 ? images.length - 1 : selected - 1))
        }
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/50 group-focus:outline-none sm:h-7 sm:w-7 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60">
          <svg
            aria-hidden="true"
            className="h-3 w-3 text-white dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={(): void =>
          setSelected((selected) => (selected === images.length - 1 ? 0 : selected + 1))
        }
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/50 group-focus:outline-none sm:h-7 sm:w-7 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60">
          <svg
            aria-hidden="true"
            className="h-3 w-3 text-white dark:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
