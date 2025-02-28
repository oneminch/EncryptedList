import React from "react";
import Image from "next/image";
import { slugify } from "@/lib/utils";

interface ProductItemPillProps {
  className?: string;
  productName: string;
  isAlternative?: boolean;
}

const ProductItemPill: React.FC<ProductItemPillProps> = ({
  className,
  productName,
  isAlternative
}) => {
  return (
    <div
      className={`inline-flex justify-start items-center gap-x-2 w-auto h-6 p-1 pr-2 rounded-md text-sm shrink-0 bg-zinc-100 dark:bg-zinc-800 border-[0.5px] border-zinc-300 dark:border-zinc-700 ${
        className && className
      }`}>
      <Image
        className="bg-zinc-200 object-contain rounded-sm w-4 h-4 aspect-square shrink-0 overflow-hidden text-xs m-0 text-center"
        src={`https://icons.encryptedlist.xyz/icons/${
          isAlternative ? "alternatives" : "apps"
        }/${slugify(productName)}.png`}
        width={20}
        height={20}
        alt={`Logo for ${productName}`}
      />
      <p>{productName}</p>
    </div>
  );
};

export default ProductItemPill;
