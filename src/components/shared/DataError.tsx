export default function DataError({ message }: { message: string }) {
  return (
    <section className="flex flex-col gap-y-4 items-center justify-center border border-zinc-200 dark:border-transparent md:dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg">
      <h2 className="text-5xl">🐛</h2>
      <h3 className="text-xl">{message}</h3>
    </section>
  );
}
