import { ReactElement, useEffect, useState } from 'react';
import { LeftIcon, RightIcon } from '../SVG';

type GalleryProps = {
  images: string[];
};

const Gallery = ({ images }: GalleryProps): ReactElement => {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  console.log(selected);

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
      <img src={images[selected]} alt={images[selected]} className="h-full w-full" />
      <div className="absolute left-0 right-0 bottom-0 items-baseline flex gap-2 z-50">
        {images.map((image, idx) => (
          <img
            src={image}
            alt={image}
            key={idx}
            onClick={() => setSelected(idx)}
            className={`border rounded cursor-pointer ${
              hovered === idx || (!hovered && selected === idx)
                ? 'w-[60px] h-[80px]'
                : 'w-[40px] h-[60px]'
            } transition-all duration-200`}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
