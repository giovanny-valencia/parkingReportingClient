/**
 * Constant image information, avoids circular dependency
 */

export const IMAGE_TYPES = {
  licensePlate: 0,
  violation: 1,
} as const;

// Define the type for the IMAGE_TYPES values
type ImageType = (typeof IMAGE_TYPES)[keyof typeof IMAGE_TYPES];

export interface ImageContent {
  id: number;
  uri: string;
  type: ImageType;
}

// making expo happy
export default function ts() {
  return;
}
