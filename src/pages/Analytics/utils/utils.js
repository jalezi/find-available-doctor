/**
 * Checks if the browser supports fullscreen mode for a given element.
 *
 * @param {Element} element - The element to check for fullscreen support.
 * @returns {boolean} - True if fullscreen is supported, false otherwise.
 */
export function getIsRequestFullscreenSupported(element) {
  const requestFullscreenMethods = [
    'requestFullscreen',
    'webkitRequestFullscreen', // Safari
    'mozRequestFullScreen', // Firefox
    'msRequestFullscreen', // Internet Explorer/Edge
  ];

  return requestFullscreenMethods.some(method => element[method]);
}
