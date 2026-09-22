import { useState } from 'react';
import { FALLBACK_BEAUTY_IMAGE, INLINE_FALLBACK_SVG } from '../data/images';

interface LuxuryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export default function LuxuryImage({
  src,
  alt = 'Velora Luxury Beauty',
  className = '',
  containerClassName = '',
  fallbackSrc = FALLBACK_BEAUTY_IMAGE,
  loading = 'lazy',
  ...props
}: LuxuryImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);

  const handleError = () => {
    if (!hasFailedOnce) {
      setHasFailedOnce(true);
      setImgSrc(fallbackSrc);
    } else {
      // Fallback to inline SVG if network/CDN is completely blocked
      setImgSrc(INLINE_FALLBACK_SVG);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading={loading}
      referrerPolicy="no-referrer"
      className={`w-full h-full object-cover block ${className}`}
      {...props}
    />
  );
}
