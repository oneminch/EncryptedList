import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const useSearchQuery = () => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSubmittingAllowed, setIsSubmittingAllowed] = useState<boolean>(true);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcuts);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcuts);
    };
  }, []);

  useEffect(() => {
    setIsSearching(debouncedQuery.trim().length >= 3);
  }, [debouncedQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    if (!isSubmittingAllowed) {
      return;
    }

    const params = new URLSearchParams();
    params.set("query", query);

    router.push(`/?${params.toString()}`, {
      scroll: true
    });
  };

  return {
    query,
    debouncedQuery,
    inputRef,
    isSearching,
    isSubmittingAllowed,
    setIsSubmittingAllowed,
    handleKeyDown,
    handleQuerySubmit,
    handleQueryChange
  };
};

export default useSearchQuery;
