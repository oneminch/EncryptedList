import ModalIcon from "../shared/modal-icon";
import React from "react";
import ProductItemPill from "./product-item-pill";
import { getAlternatives } from "@/lib/data";
import GenericError from "../shared/generic-error";

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
      <div className="[&>span]:font-semibold flex items-center gap-x-1 mb-2">
        <ProductItemPill productName={productName} />
        <p className="flex items-center">
          can be a more secure alternative to:
        </p>
      </div>
      <ul className="flex items-center gap-2 flex-wrap px-2 py-4">
        {alternatives.length > 0 || tagError !== null ? (
          alternatives.map((appName) => (
            <li key={appName}>
              <ProductItemPill
                className="h-7 p-1 text-base rounded-md [&>img]:w-5 [&>img]:h-5"
                productName={appName}
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
