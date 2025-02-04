import ModalIcon from "../shared/modal-icon";
import React from "react";
import AlternativesItem from "./product-alternatives-item";

interface AlternativesListProps {
  productName: string;
}

const AlternativesList: React.FC<AlternativesListProps> = ({
  productName
}): React.ReactNode => {
  return (
    <section className="min-w-sm">
      <ModalIcon icon="heroicons:arrows-right-left-20-solid" />
      <p className="[&>span]:font-semibold">
        <span className="text-yellow-500">&ldquo;</span>
        <span>{productName}</span>
        <span className="text-yellow-500">&rdquo;</span> can be a more secure
        alternative to:
      </p>
      <ul className="flex items-center gap-2 py-4">
        {["App 1", "App 2", "App 3"].map((app) => (
          <AlternativesItem key={app} alternativeName={app} />
        ))}
      </ul>
    </section>
  );
};

export default AlternativesList;
