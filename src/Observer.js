import React, { useState, useEffect } from "react";

const useObserver = (ref, options) => {
  const [Intersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      return;
    }
    setIntersecting(entry.isIntersecting);
    observer.unobserve(entry.target);
  }, options);

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return Intersecting;
};
export default useObserver;
