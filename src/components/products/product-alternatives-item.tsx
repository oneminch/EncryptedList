import React from "react";
import Image from "next/image";
import { slugify } from "@/lib/utils";

interface AlternativesItemProps {
  alternativeName: string;
}

const AlternativesItem: React.FC<AlternativesItemProps> = ({
  alternativeName
}) => {
  return (
    <li className="flex items-center gap-x-2 w-auto h-8 p-1 pr-3 rounded-full text-sm shrink-0 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
      <Image
        className="bg-zinc-200 object-cover rounded-full w-6 h-6 aspect-square shrink-0 overflow-hidden text-xs text-center"
        src={`https://icons.encryptedlist.xyz/icons/alternatives/${slugify(
          alternativeName
        )}.png`}
        width={24}
        height={24}
        alt={`Logo for ${alternativeName}`}
      />
      <p>{alternativeName}</p>
    </li>
  );
};

export default AlternativesItem;
