export const stateAbbreviations: { [key: string]: string } = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  "west virginia": "WV",
  wisconsin: "WI",
  wyoming: "WY",
};

/**
 * Converts a state name to title case (e.g., "new jersey" becomes "New Jersey").
 * @param stateName The input state name string.
 * @returns The state name in title case.
 */
export const toTitleCaseStateName = (
  stateName: string | null | undefined
): string => {
  if (!stateName) {
    return "";
  }

  return stateName
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Converts a state abbreviation (e.g., "NJ") to its full name (e.g., "New Jersey").
 * @param abbreviation The two-letter abbreviation of the state.
 * @returns The full name of the state, or undefined if not found.
 */
export const getFullStateName = (
  abbreviation: string | null | undefined
): string | undefined => {
  if (!abbreviation || typeof abbreviation !== "string") {
    return undefined;
  }

  const normalizedAbbreviation = abbreviation.toUpperCase().trim();

  // Reverse lookup: find the key (full name) based on the value (abbreviation)
  for (const fullName in stateAbbreviations) {
    if (stateAbbreviations[fullName] === normalizedAbbreviation) {
      return toTitleCaseStateName(fullName);
    }
  }

  return undefined; // Return undefined if the abbreviation is not found
};

/**
 * Converts a full U.S. state name to its two-letter abbreviation.
 * @param fullStateName The full name of the state (e.g., "New Jersey")
 * @returns The two-letter abbreviation (e.g., "NJ") or undefined if not found
 */
export const getStateAbbreviation = (fullStateName: string | null): string => {
  if (
    !fullStateName ||
    typeof fullStateName !== "string" ||
    fullStateName === null
  ) {
    return "";
  }

  const normalizedName = fullStateName.toLowerCase().trim();
  return stateAbbreviations[normalizedName];
};
