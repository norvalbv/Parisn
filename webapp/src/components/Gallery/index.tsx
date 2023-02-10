import { ReactElement, useState } from 'react';
import { LeftIcon, RightIcon } from '../SVG';

type GalleryProps = {
  images: string[];
};

const Gallery = ({ images }: GalleryProps): ReactElement => {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative flex h-full w-full">
      <LeftIcon
        className="absolute top-1/2 left-0 z-50 border rounded-full border-[#ffffff40] cursor-pointer hover:scale-110"
        onClick={() =>
          setSelected((selected) => (selected === 0 ? images.length - 1 : selected - 1))
        }
      />
      <RightIcon
        className="absolute top-1/2 right-0 z-50 border rounded-full border-[#ffffff40] cursor-pointer hover:scale-110"
        onClick={() =>
          setSelected((selected) => (selected === images.length - 1 ? 0 : selected + 1))
        }
      />
      <img
        src={hovered ? images[hovered] : images[selected]}
        alt={images[selected]}
        className="h-full w-full pointer-events-none select-none"
      />
      <div className="absolute right-1/3 bottom-0 items-baseline flex z-10">
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
              className={`border rounded cursor-pointer ${
                hovered === idx || (hovered === null && selected === idx)
                  ? 'w-[60px] h-[80px]'
                  : 'w-[40px] h-[60px]'
              } transition-all duration-200`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
