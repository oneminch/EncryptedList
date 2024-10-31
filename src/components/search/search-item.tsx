import Image from "next/image";

export default function SearchItem({ product }: { product: any }) {
  return (
    <li
      className="w-full px-4 py-3 border-b last:border-none border-zinc-100 dark:border-zinc-800 flex flex-col gap-y-4 focus:outline-none group"
      tabIndex={0}>
      <div className="flex items-center gap-x-4">
        <Image
          className="bg-zinc-200 dark:bg-zinc-700 rounded-full h-10 w-10 shrink-0 group-focus:outline group-focus:outline-red-300"
          src={product.image}
          width={40}
          height={40}
          alt={`Product Icon for ${product.name}`}
        />
        <div className="flex flex-col gap-y-1">
          <p className="font-medium">{product.name}</p>
          <div className="flex items-center gap-x-1">
            {product.tags.map((tag: string) => (
              <span
                className="text-xs font-medium px-3 py-0.5 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-700"
                key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
