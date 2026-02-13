
import data from '@/app/lib/placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Ensure data.placeholderImages exists or default to an empty array to prevent crashes
export const PlaceHolderImages: ImagePlaceholder[] = data?.placeholderImages || [];
