/**
 * Error fields for the user violation report
 *
 * used by ReportPage to construct an error array
 * which gets sent to the ReportView and GeoAddressPicker UI components
 */

export const ErrorIndex = {
  licensePlateImage: 0,
  licensePlateStateSelection: 1,
  licensePlateTextInput: 2,
  supportingImage: 3,
  violationDetails: 4,
  addressPicker: 5,
} as const;

export interface ErrorField {
  id: number;
  message: string;
}

export type FieldIndexKey = keyof typeof ErrorIndex;
