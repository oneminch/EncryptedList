import React from "react";
import Image from "next/image";

interface AlternativesItemProps {
  alternativeName: string;
}

const AlternativesItem: React.FC<AlternativesItemProps> = ({
  alternativeName
}): React.ReactNode => {
  return (
    <li className="flex items-center gap-x-2 w-auto h-8 p-1 pr-3 rounded-full text-sm shrink-0 bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600">
      <Image
        className="bg-zinc-200 object-cover rounded-full w-6 h-6 aspect-square shrink-0 overflow-hidden text-xs text-center"
        src={`https://icons.encryptedlist.xyz/icons/apps/signal.png`}
        // `https://icons.encryptedlist.xyz/icons/apps/${slugify(product.name)}.png`
        width={24}
        height={24}
        alt={`Logo for ${alternativeName}`}
      />
      <p>{alternativeName}</p>
    </li>
  );
};

export default AlternativesItem;
