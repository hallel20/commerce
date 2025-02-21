import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Image = ({ src, alt, width, height, className }: ImageProps) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      effect="blur"
      className={className}
    />
  );
};

export default Image;
