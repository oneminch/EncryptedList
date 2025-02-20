import ModalIcon from "../shared/modal-icon";
import React from "react";
import AlternativesItem from "./product-alternatives-item";
import { getAlternatives } from "@/lib/data";
import GenericError from "../shared/generic-error";
import { sleep } from "@/lib/utils";

interface AlternativesListProps {
  productName: string;
}

const AlternativesList: React.FC<AlternativesListProps> = async ({
  productName
}) => {
  const { alternatives, error: tagError } = await getAlternatives(productName);

  return (
    <section className="min-w-sm">
      <ModalIcon icon="heroicons:arrows-right-left-20-solid" />
      <p className="[&>span]:font-semibold">
        <span className="text-yellow-500">&ldquo;</span>
        <span>{productName}</span>
        <span className="text-yellow-500">&rdquo;</span> can be a more secure
        alternative to:
      </p>
      <ul className="flex items-center gap-2 flex-wrap py-4">
        {alternatives.length > 0 || tagError !== null ? (
          alternatives.map((app) => (
            <AlternativesItem key={app} alternativeName={app} />
          ))
        ) : (
          <GenericError message="Error Fetching Alternatives." />
        )}
      </ul>
    </section>
  );
};

export default AlternativesList;
