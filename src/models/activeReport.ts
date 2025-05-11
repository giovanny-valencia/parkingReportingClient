/**
 * Defines the content of an active report
 */

// Brief description of the report for mapping purposes
export interface activeReport {
  reportID: number;
  latitude: number;
  longitude: number;
  expiresAt: 0; //update this
  status: "new" | "opened" | "hidden";
}

// This is the data returned from the full report API
export interface fullReportData {
  reportID: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  images: string[];
  licensePlate: string;
  reportDescription: string;
  address: string;
  addressNotes: string;
}
