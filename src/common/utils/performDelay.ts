/**
 * Perform a delay to mimic wait time in seconds.
 *
 * @param seconds number of seconds to delay
 */
export default function performDelay(seconds: number) {
  setTimeout(() => {
    // Your code to execute after the 1-second delay
    console.log("This message appears after 1 second.");
  }, seconds * 1000); // 1000 milliseconds = 1 second
}
