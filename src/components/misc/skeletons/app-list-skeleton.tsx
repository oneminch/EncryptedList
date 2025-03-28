import AppItemSkeleton from "@/components/misc/skeletons/app-item-skeleton";

const AppListSkeleton: React.FC = () => {
  return (
    <ul className="w-full px-2 md:px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, index) => (
        <AppItemSkeleton key={index} />
      ))}
    </ul>
  );
};

export default AppListSkeleton;
