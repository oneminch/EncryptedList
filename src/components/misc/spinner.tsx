interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => (
  <div
    className={`w-5 h-5 animate-spin rounded-full border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-800 dark:border-t-zinc-200 ${className}`}
  />
);

export default Spinner;
