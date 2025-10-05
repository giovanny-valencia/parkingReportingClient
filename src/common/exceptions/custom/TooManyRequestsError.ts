/**
 * Custom error class for 429 Too Many Requests responses.
 * This allows the consuming component to specifically catch and handle the cool down state.
 */
export class TooManyRequestsError extends Error {
  constructor(message: string = "Rate limit exceeded. Please try again later.") {
    super(message);
    this.name = "TooManyRequestsError";
  }
}
