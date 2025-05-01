import { Fields } from "@constants/addressFields";
import { create } from "zustand";
import * as Location from "expo-location";
import { createAddress } from "@utils/addressUtils";
import { Alert } from "react-native";

interface LocationStore {
  currentLocation: Fields | null;
  vehicleLocation: Fields | null;
  setLocationByCoords: (latitude: number, longitude: number) => Promise<void>;
  setVehicleByCoords: (latitude: number, longitude: number) => Promise<void>;
  updateCurrentLocation: (address: Fields) => void;
  updateVehicleLocation: (address: Fields) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  currentLocation: null,

  vehicleLocation: null,

  setLocationByCoords: async (latitude, longitude) => {
    try {
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = createAddress({ location, latitude, longitude });

      set({ currentLocation: address, vehicleLocation: address });
    } catch (error) {
      console.error("Failed to convert lat/long to address:", error);

      Alert.alert(
        "Location Error",
        "We couldn't convert your location to a valid address. Please try again.",
        [{ text: "OK" }]
      );
    }
  },

  updateCurrentLocation: (address) => {
    set({ currentLocation: address, vehicleLocation: address });
  },

  setVehicleByCoords: async (latitude, longitude) => {
    try {
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = createAddress({ location, latitude, longitude });

      set({ vehicleLocation: address });
    } catch (error) {
      console.error("Failed to convert lat/long to address:", error);

      Alert.alert(
        "Location Error",
        "We couldn't convert your location to a valid address. Please try again.",
        [{ text: "OK" }]
      );
    }
  },

  updateVehicleLocation: (address) => {
    set({ vehicleLocation: address });
  },

  clearLocation: () => {
    set({ currentLocation: null, vehicleLocation: null });
  },
}));
