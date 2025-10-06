// -- Location type dtos

export interface LocationStatusProps {
  isLoading: boolean;
  cooldownTimer: number;
  currentCityData: cityDto | null;
  clearDashLocation: () => void;
  getUserLocation: () => void;
}
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
