interface PageDividerProps {
  className?: string;
}

const PageDivider: React.FC<PageDividerProps> = ({ className }) => {
  return (
    <section id="main-content">
      <hr
        className={`w-1/4 mx-auto mt-8 sm:mt-12 mb-6 sm:mb-12 block border-none bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent h-px rounded-full ${className}`}
      />
    </section>
  );
};

export default PageDivider;
