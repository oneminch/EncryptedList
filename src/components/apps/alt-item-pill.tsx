import { getIconBaseUrl, slugify } from "@/lib/utils";

interface AltItemPillProps {
  className?: string;
  appName: string;
  isAlternative?: boolean;
}

const PILL_ICON_SIZE = 20;

const AltItemPill: React.FC<AltItemPillProps> = ({
  className,
  appName,
  isAlternative
}) => {
  const iconBaseUrl = getIconBaseUrl(PILL_ICON_SIZE);

  return (
    <div
      className={`inline-flex justify-start items-center gap-x-2 w-auto h-6 p-1 pr-2 mr-1.5 rounded-md text-sm shrink-0 bg-zinc-100 dark:bg-zinc-800 border-[0.5px] border-zinc-300 dark:border-zinc-700 ${
        className && className
      }`}>
      <img
        className="bg-zinc-200 object-contain rounded-sm w-4 h-4 aspect-square shrink-0 overflow-hidden text-xs m-0 text-center"
        src={`${iconBaseUrl}${
          isAlternative ? "alternatives" : "apps"
        }/${slugify(appName)}.png`}
        width={PILL_ICON_SIZE}
        height={PILL_ICON_SIZE}
        alt={`Logo for ${appName}`}
      />
      <p>{appName}</p>
    </div>
  );
};

export default AltItemPill;
