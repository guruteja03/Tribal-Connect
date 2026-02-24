import { useState } from 'react';

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'><rect width='1200' height='800' fill='%23f1e5cf'/><rect x='120' y='120' width='960' height='560' rx='30' fill='%23d2b274'/><text x='600' y='400' font-family='Arial,sans-serif' font-size='58' text-anchor='middle' fill='%23634524'>TribalCraft Product</text></svg>";

function ProductImage({ src, alt, className = '' }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE);
      }}
      loading="lazy"
    />
  );
}

export default ProductImage;
