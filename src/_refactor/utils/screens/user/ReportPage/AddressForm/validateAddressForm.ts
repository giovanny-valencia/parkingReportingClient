import { Fields } from "_refactor/constants/addressFields";
import { Jurisdiction } from "_refactor/constants/jurisdiction";

interface Params {
  address: Fields | null;
  jurisdictionMap: Map<string, Jurisdiction>;
}

export const validateAddressForm = ({ address, jurisdictionMap }: Params) => {
  if (address === null) return null;

  const state = address.state.toUpperCase();
  const city = address.city.toUpperCase().trim().replace(/\s+/g, "-");
  const key = `${state}-${city}`;

  // returns the jurisdiction object
  const isLocationSupported = jurisdictionMap.get(key);

  if (!isLocationSupported) {
    return false;
  }

  return true;
};
