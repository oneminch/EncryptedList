"use client";

import { Icon } from "@iconify-icon/react";
import Tag from "./Tag";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Filter({ className }: { className: string }) {
  const FILTERS = [
    "Web App",
    "Open-Source",
    "Developer Tools",
    "Opt-In",
    "Free",
    "Decentralized"
  ];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // useEffect(() => {
  //   const selectedTags = searchParams.get("tags");

  //   if (selectedTags) {
  //   }
  // }, []);

  const handleTagChange = (tagName: string, isTagChecked: boolean) => {
    const selectedTags = searchParams.get("tags")?.split(",") || [];
    console.log(selectedTags);

    let newCheckedTags = [];
    if (selectedTags.length === 0) {
      if (isTagChecked) newCheckedTags.push(tagName);
    } else {
      newCheckedTags = isTagChecked
        ? [...selectedTags, tagName]
        : selectedTags.filter((tag) => tag !== tagName);
    }

    // Set URL params
    const params = new URLSearchParams(searchParams);
    if (newCheckedTags.length > 0) {
      params.set("tags", newCheckedTags.join(","));
    } else {
      params.delete("tags");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      // onSubmit={handleChange}
      className={`border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-4 px-5 max-h-72 sticky top-2 rounded-lg flex flex-col gap-y-4 ${className}`}
    >
      <header className="flex items-center justify-between">
        <h2 className="font-medium text-xl">Tags</h2>
        <button
          type="submit"
          className="action-item w-9"
          aria-label="Sort Products"
        >
          <Icon icon="heroicons:arrows-up-down-20-solid" />
        </button>
      </header>
      <div className="flex items-center flex-wrap">
        {FILTERS.map((item) => (
          <Tag
            key={item}
            tagName={item.toLocaleLowerCase()}
            tagLabel={item}
            tagChecked={false}
            onTagChange={handleTagChange}
          />
        ))}
      </div>
      <button className="action-item w-full px-4 py-2 mt-auto" type="submit">
        Clear Tags
      </button>
    </form>
  );
}
