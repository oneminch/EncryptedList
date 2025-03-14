import ModalIcon from "../modal/modal-icon";
import React from "react";
import AppItemPill from "./app-item-pill";
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
    <section className="min-w-sm">
      <ModalIcon icon="ph:arrows-left-right-duotone" />
      <div className="[&>span]:font-semibold flex items-center gap-x-1 mb-2">
        <AppItemPill appName={appName} />
        <p className="flex items-center">
          can be a more secure alternative to:
        </p>
      </div>
      <ul className="flex items-center gap-2 flex-wrap px-2 py-4">
        {alternatives.length > 0 || tagError !== null ? (
          alternatives.map((appName) => (
            <li key={appName}>
              <AppItemPill
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
