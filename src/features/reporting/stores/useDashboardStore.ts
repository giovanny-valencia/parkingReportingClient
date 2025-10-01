import { create } from "zustand";
import * as Location from "expo-location";
import { LocationDto, cityDto } from "@features/reporting/dtos/Location";

/**
 * Interface representing useable location data
 * @property {LocationDto | null} currentUserCoordinates - current long lat coordinates of the user.
 * @property {cityDto | null} currentCityData - current city data obtained from server. State, city, coordinate boundaries.
 * @property {cityDto[] | null} cachedCities - server retrieves a current city of the user and caches in this array. Makes for fast look ups given a users current location.
 */
interface LocationState {
  currentUserCoordinates: LocationDto | null;
  currentCityData: cityDto | null;
  cachedCities: cityDto[] | null;
}

interface LocationActions {
  setCurrentCity: (currentUserCoordinates: LocationDto) => void;
  clearDeashBoardStore: () => void;
}

export const useDashboardStore = create<LocationState & LocationActions>((set, get) => {
  return {
    currentUserCoordinates: null,
    currentCityData: null,
    cachedCities: null,
    setCurrentCity: (currentUserCoordinates) => {},
    clearDeashBoardStore: () =>
      set({
        currentUserCoordinates: null,
        currentCityData: null,
        cachedCities: null,
      }),
  };
});
