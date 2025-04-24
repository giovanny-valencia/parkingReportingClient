import { LocationGeocodedAddress } from "expo-location";
import { getStateAbbreviation } from "./stateAbbreviation";
import addressFields from "@constants/addressFields";

interface props {
  location: LocationGeocodedAddress[];
  latitude: number;
  longitude: number;
}

/**
 * Creates a normalized address from raw geocoded location data.
 *
 * @param {props} props - Parameters for address creation
 * @param {LocationGeocodedAddress[]} props.location - Raw geocoded data from {@link reverseGeocodeAsync}
 * @param {number} props.latitude - Latitude coordinate
 * @param {number} props.longitude - Longitude coordinate
 * @returns {typeof addressFields | null} Normalized address object or null if required fields are missing
 */
export const createAddress = ({ location, latitude, longitude }: props) => {
  const city = location[0].city || "";
  const state =
    location[0].region?.length === 2
      ? location[0].region
      : getStateAbbreviation(location[0].region) || "";
  const zipcode = location[0].postalCode || "";
  const streetNumber = location[0].streetNumber || "";
  const street = location[0].street || "";
  const streetAddress = `${streetNumber} ${street}`; // removed: ${city}, ${state} ${zipcode}. These can be inferred from other data fields

  const address: typeof addressFields = {
    latitude: latitude,
    longitude: longitude,
    city: city,
    state: state,
    streetAddress: streetAddress,
    zipCode: zipcode,
  };

  return address;
};
