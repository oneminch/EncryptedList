import AppItemSkeleton from "@/components/misc/skeletons/app-item-skeleton";

export default function AppListSkeleton(): React.ReactNode {
  return (
    <ul className="w-full px-2 md:px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, index) => (
        <AppItemSkeleton key={index} />
      ))}
    </ul>
  );
}
