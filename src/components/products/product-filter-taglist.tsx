"use client";

import useArrowNavigation from "@/hooks/useArrowNavigation";
import { useRef } from "react";
import TagItem from "./product-filter-tag";

export default function TagList({ tags }: { tags: string[] }): React.ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentIndex, setCurrentIndex } = useArrowNavigation(
    tags.length,
    containerRef
  );

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="flex md:flex-col flex-row md:items-start items-center gap-x-2 gap-y-2 flex-wrap">
      {tags.map((item, index) => (
        <TagItem
          key={item}
          tag={item}
          isFocused={index === currentIndex}
          onFocus={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  );
}
