import ModalIcon from "../modal/modal-icon";
import React from "react";
import AltItemPill from "./app-item-pill";
import { getAlternatives } from "@/lib/data";
import GenericError from "../misc/generic-error";

interface AlternativesListProps {
  appName: string;
}

const AlternativesList: React.FC<AlternativesListProps> = async ({
  appName
}) => {
  const { alternatives, error: tagError } = await getAlternatives(appName);

  return (
    <section className="min-w-xs">
      <ModalIcon icon="ph:arrows-left-right-duotone" />
      <p className="mb-2 break-words">
        <span className="font-semibold text-yellow-400">
          &#10077;
          <span className="text-zinc-800 dark:text-zinc-200">{appName}</span>
          &#10078;
        </span>{" "}
        can be a more secure alternative to:
      </p>

      <ul className="flex items-center gap-2 flex-wrap px-2 py-4">
        {alternatives.length > 0 || tagError !== null ? (
          alternatives.map((appName) => (
            <li key={appName}>
              <AltItemPill
                className="h-7 p-1 text-base rounded-md [&>img]:w-5 [&>img]:h-5"
                appName={appName}
                isAlternative
              />
            </li>
          ))
        ) : (
          <GenericError message="Error Fetching Alternatives." />
        )}
      </ul>
    </section>
  );
};

export default AlternativesList;
