export class LocationPermissionDeniedError extends Error {
  constructor(message: string = "Location permission was denied") {
    super(message);
    this.name = "LocationPermissionDeniedError";
  }
}
