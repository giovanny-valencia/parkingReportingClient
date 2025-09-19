/**
 * Converts a JavaScript Date object to an ISO-formatted date string (YYYY-MM-DD).
 * This is the recommended format for sending dates to a backend.
 *
 * @param date - The JavaScript Date object to convert.
 * @returns The formatted date string, or an empty string if the date is invalid.
 */
export function formatDateToISO(date: Date): string {
  if (!date || isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
