import { LocationGeocodedAddress } from "expo-location";
import { getStateAbbreviation } from "./stateAbbreviation";
import AddressFields from "@/src/constants/AddressFields";

interface props {
  location: LocationGeocodedAddress[];
  latitude: number;
  longitude: number;
}

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
  const streetAddress = `${streetNumber} ${street}, ${city}, ${state} ${zipcode}`; // might remove city, state, zipcode

  // if any fields are missing just return null. Left out streetNumber, might not always be provided(?)
  if (!city || !state || !streetAddress || !zipcode || !street) {
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
