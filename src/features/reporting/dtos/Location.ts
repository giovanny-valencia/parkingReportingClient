export interface LocationDto {
  longitude: number;
  latitude: number;
}

export interface cityDto {
  state: string;
  city: string;
  //TODO: add boundaries later so client can perform point-in-polygon checks
  //boundaries: LocationDto[];
}
