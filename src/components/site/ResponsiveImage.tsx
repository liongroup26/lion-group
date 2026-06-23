import { type ImgHTMLAttributes } from "react";

// Eagerly import all responsive WebP variants in src/assets as URLs.
// Vite will hash and bundle them. Keys look like "/src/assets/hero-car-800.webp".
const webpModules = import.meta.glob("/src/assets/*-{480,800,1200,1600}.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const WIDTHS = [480, 800, 1200, 1600] as const;

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "srcSet"> & {
  /** Imported jpg URL (fallback) */
  src: string;
  /** Base name without extension or suffix, e.g. "hero-car" */
  name: string;
  /** sizes attribute, e.g. "(min-width: 1024px) 600px, 100vw" */
  sizes?: string;
  alt: string;
};

/**
 * Renders a <picture> with WebP srcset (480/800/1200/1600w) plus the original
 * JPG as fallback. Use width/height for CLS prevention and `sizes` for accuracy.
 */
export function ResponsiveImage({ src, name, sizes = "100vw", alt, ...rest }: Props) {
  const sources = WIDTHS.map((w) => {
    const url = webpModules[`/src/assets/${name}-${w}.webp`];
    return url ? `${url} ${w}w` : null;
  })
    .filter(Boolean)
    .join(", ");

  return (
    <picture style={{ display: "contents" }}>
      {sources && <source type="image/webp" srcSet={sources} sizes={sizes} />}
      <img src={src} alt={alt} sizes={sizes} {...rest} />
    </picture>
  );
}
