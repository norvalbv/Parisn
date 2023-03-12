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
          className="h-screen w-full pointer-events-none select-none"
          alt={images[selected]}
        />
      </div>
      {/* <!-- Slider indicators --> */}
      <div className="absolute z-30 flex space-x-2 items-baseline justify-end -translate-x-1/2 bottom-0 left-1/2">
        {images.map((image, idx) => (
          <div
            className="px-1"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={image}
              alt={image}
              key={idx}
              onClick={() => setSelected(idx)}
              className={`border rounded cursor-pointer select-none ${
                hovered === idx || (hovered === null && selected === idx)
                  ? 'w-[60px] h-[80px]'
                  : 'w-[40px] h-[60px]'
              } transition-all duration-200`}
            />
          </div>
        ))}
      </div>
      {/* <!-- Slider controls --> */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() =>
          setSelected((selected) => (selected === 0 ? images.length - 1 : selected - 1))
        }
      >
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full sm:w-7 sm:h-7 bg-white/20 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-3 h-3 text-white dark:text-gray-800"
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
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={() =>
          setSelected((selected) => (selected === images.length - 1 ? 0 : selected + 1))
        }
      >
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full sm:w-7 sm:h-7 bg-white/20 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-3 h-3 text-white dark:text-gray-800"
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
