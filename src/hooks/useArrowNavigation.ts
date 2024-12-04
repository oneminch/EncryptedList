import React, { useState, useEffect, useRef } from "react";

const useArrowNavigation = (
  listLength: number,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(document.activeElement)
      ) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            setCurrentIndex((prevIndex) => (prevIndex + 1) % listLength);
            break;
          case "ArrowUp":
            event.preventDefault();
            setCurrentIndex(
              (prevIndex) => (prevIndex - 1 + listLength) % listLength
            );
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [listLength]);

  return { currentIndex, setCurrentIndex };
};

export default useArrowNavigation;
