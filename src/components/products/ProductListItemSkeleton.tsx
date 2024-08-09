// import Image from "next/image";

export default function ProductListItemSkeleton() {
  return (
    <li className="w-full p-4 border-b last:border-none border-zinc-100 dark:border-zinc-800 flex flex-col justify-center gap-y-4 animate-pulse">
      <div className="flex items-center gap-x-4">
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-12 w-12 shrink-0" />
        <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg w-1/5 h-4" />
      </div>
      <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg w-2/3 h-4" />
    </li>
    // <li className="w-full p-4 border-b last:border-none border-zinc-100 dark:border-zinc-800 bg-transparent flex flex-col gap-y-4">
    //   <div className="flex items-center gap-x-4">
    //     <Image
    //       className="bg-zinc-200 rounded-full h-12 w-12 shrink-0 overflow-hidden text-xs text-center"
    //       src={product.image}
    //       width={48}
    //       height={48}
    //       alt={`Logo for ${product.name}`}
    //     />
    //     <div className="flex flex-col gap-y-2">
    //       <div className="font-medium">{product.name}</div>
    //       <div className="flex items-center gap-x-1">
    //         {product.tags.map((tag: string) => (
    //           <span
    //             className="text-xs font-medium px-3 py-0.5 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-700"
    //             key={tag}
    //           >
    //             {tag}
    //           </span>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <div className="rounded-lg text-zinc-600 dark:text-zinc-400">{`${product.instructions[0]} ${product.instructions[1]}`}</div>
    //   </div>
    // </li>
  );
}
