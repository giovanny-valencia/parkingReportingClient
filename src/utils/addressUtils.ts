import { LocationGeocodedAddress } from "expo-location";
import { getStateAbbreviation } from "./stateAbbreviation";
import AddressFields from "@constants/AddressFields";

interface props {
  location: LocationGeocodedAddress[];
  latitude: number;
  longitude: number;
}

/**
 * Creates a normalized address from raw geocoded location data.
 *
 * @param {props} props - Parameters for address creation
 * @param {LocationGeocodedAddress[]} props.location - Raw geocoded data from {@link Location.reverseGeocodeAsync}
 * @param {number} props.latitude - Latitude coordinate
 * @param {number} props.longitude - Longitude coordinate
 * @returns {typeof AddressFields | null} Normalized address object or null if required fields are missing
 */
export const createAddress = ({ location, latitude, longitude }: props) => {
  console.log("createAddress called");

  const city = location[0].city || "";
  const state =
    location[0].region?.length === 2
      ? location[0].region
      : getStateAbbreviation(location[0].region) || "";
  const zipcode = location[0].postalCode || "";
  const streetNumber = location[0].streetNumber || "";
  const street = location[0].street || "";
  const streetAddress = `${streetNumber} ${street}`; // removed: ${city}, ${state} ${zipcode}. These can be inferred from other data fields

  /**
   * Unsure if this is too strict.
   *
   * City, required
   * State, required
   * Street address is made up of specifically the street. Removing for now.
   * removed zip code requirement for now as well.
   * Street, definitely needed. I think? Removing for now, can be pinned with long/lat
   * including lat/long because if those are missing something clearly went wrong
   *
   */
  if (!city || !state || !latitude || !longitude) {
    return null;
  }

  const address: typeof AddressFields = {
    city: city,
    state: state,
    streetAddress: streetAddress,
    zipCode: zipcode,
    latitude: latitude,
    longitude: longitude,
  };

  return address;
};
