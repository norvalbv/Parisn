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
    <div className="relative flex">
      <LeftIcon
        className=" top-1/2 right-0 z-50 bg-red-500 cursor-pointer"
        onClick={() =>
          setSelected((selected) => (selected === 0 ? images.length - 1 : selected - 1))
        }
      />
      <RightIcon
        className="top-1/2 right-0 z-50 bg-red-500 cursor-pointer"
        onClick={() => {
          setSelected((selected) => (selected === images.length - 1 ? 0 : selected + 1));
        }}
      />
      <div>
        <img src={images[selected]} alt={images[selected]} className="h-screen w-full" />
      </div>
      <div className="fixed left-[12.5rem] bottom-0 w-[8rem] items-baseline flex gap-2 z-20">
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
