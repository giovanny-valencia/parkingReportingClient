/**
 * Defines the content of an active report
 */
export interface activeReport {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  createdOn: string;
  status: "new" | "opened" | "hidden";
}

// This is the data returned from the full report API
export interface fullReportData {
  id: number;
  // It's good practice to align the property names with the backend DTOs
  addressDto: {
    // Based on your data: {"addressDto": { ... }}
    streetAddress: string;
    zipCode: string;
    locationNotes: string;
    location: {
      latitude: number;
      longitude: number;
    };
    jurisdiction: {
      state: string;
      city: string;
    };
  };
  vehicleDto: {
    // Based on your data: {"vehicleDto": { ... }}
    state: string;
    plateNumber: string;
  };
  // Change 'images' to 'reportImageDto' and update its type
  reportImageDto: { url: string }[]; // Array of objects, each with a 'url' property
  description: string; // Based on your data: "description": "Violation notes"
  createdOn: string;
}
