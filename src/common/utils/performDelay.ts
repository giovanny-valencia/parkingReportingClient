/**
 * Perform a delay to mimic wait time in seconds.
 *
 * @param seconds number of seconds to delay
 */
export default function performDelay(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`This message appears after ${seconds} seconds.`);
      resolve(); // Resolve the promise to end the wait.
    }, seconds * 1000);
  });
}
