/**
 * Custom hook that detects the first time an element enters the viewport.
 *
 * @param {React.RefObject} ref - The ref of the element to observe.
 * @param {IntersectionObserverInit} observerOptions - Options for the IntersectionObserver.
 * @returns {boolean} - A boolean indicating whether the element has entered the viewport.
 *
 */
import { useEffect, useRef, useState } from 'react';

const useFirstViewportEntry = (ref, observerOptions) => {
  const [hasEntered, setHasEntered] = useState(false);
  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      setHasEntered(entry.isIntersecting);
    }, observerOptions),
  );

  useEffect(() => {
    const element = ref.current;
    const ob = observer.current;

    // stop observing once the element has entered the viewport for the first time
    if (hasEntered) {
      ob.disconnect();
      return;
    }

    if (element && !hasEntered) {
      ob.observe(element);
    }

    // eslint-disable-next-line consistent-return
    return () => ob.unobserve(element);
  }, [hasEntered, ref]);

  return hasEntered;
};

export default useFirstViewportEntry;
