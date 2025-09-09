export const IMAGE_TYPES = {
  licensePlate: 0,
  violation: 1,
} as const;

export interface ImageContent {
  id: number;
  uri: string;
  height: number;
  width: number;
}
