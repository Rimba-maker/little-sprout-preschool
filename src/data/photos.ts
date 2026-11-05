import manifest from './photos.json';

export type PhotoKey = keyof typeof manifest;

export interface Photo {
  src: string;
  alt: string;
  /** Pexels photo page, kept for provenance and replacement. */
  origin: string;
}

/** Resolve a photo key to its file, alt text, and Pexels origin. */
export function photo(key: PhotoKey): Photo {
  const p = manifest[key];
  return { src: p.file, alt: p.alt, origin: p.src };
}
