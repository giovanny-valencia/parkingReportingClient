export interface LocationDto {
  longitude: number;
  latitude: number;
}

export interface cityDto {
  state: string;
  city: string;
  boundaries: LocationDto[];
}
