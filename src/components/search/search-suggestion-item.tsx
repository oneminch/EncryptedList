interface SuggestionItemProps {
  content: string;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ content }) => {
  return (
    <li className="w-full py-4 text-center bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm">
      <p>{content}</p>
    </li>
  );
};

export default SuggestionItem;
