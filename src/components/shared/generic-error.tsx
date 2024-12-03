export default function GenericError({
  message,
  classes
}: {
  message: string;
  classes?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-y-4 items-center justify-center border border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 p-8 rounded-lg ${classes}`}>
      <h2 className="text-5xl">⚠</h2>
      <h3 className="text-2xl">{message || "An Error Has Occurred."}</h3>
    </div>
  );
}
