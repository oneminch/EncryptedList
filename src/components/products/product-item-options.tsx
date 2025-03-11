import { Icon } from "@iconify/react";
import Modal from "../modal/modal";
import Alternatives from "./product-alternatives-list";
import ReportProduct from "./product-report-modal";

interface ProductItemOptionsProps {
  product: {
    name: string;
    hasAlternatives: boolean;
  };
}

const ProductItemOptions: React.FC<ProductItemOptionsProps> = ({ product }) => {
  return (
    <div className="hover:z-20 focus-within:z-20 absolute inset-0 rounded-md group/options">
      <button
        className="w-7 h-7 z-30 p-0.5 absolute right-5 top-4 flex items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 bg-white/75 dark:bg-zinc-800/50 hover:bg-white/75 dark:hover:bg-zinc-800/50 group-focus-within/options:bg-white/75 dark:group-focus-within/options:bg-zinc-800/50 border-[0.5px] border-zinc-300 dark:border-zinc-600 grow-0 shrink-0 text-base cursor-pointer transition-all duration-75 group-hover/options:bg-white/75 dark:group-hover/options:bg-zinc-800/50 peer focus-visible:global-focus"
        title="Options"
        aria-label="Options">
        <Icon icon="heroicons:ellipsis-horizontal-20-solid" />
      </button>
      <ul className="w-full h-full gap-4 *:w-2/3 bg-zinc-50/75 dark:bg-zinc-900/75 backdrop-blur-md hidden group-focus-within/options:flex peer-hover:flex hover:flex flex-col items-center justify-center">
        <li>
          {product.hasAlternatives && (
            <Modal
              title="Alternatives"
              triggerContent={
                <>
                  <span>Alternative To</span>
                  <Icon icon="heroicons:arrows-right-left-20-solid" />
                </>
              }
              triggerClasses="w-full px-4 py-1.5 text-sm flex items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 focus-visible:global-focus">
              <Alternatives productName={product.name} />
            </Modal>
          )}
        </li>
        <li>
          <Modal
            title="Report App"
            closableByAnyMeans={false}
            triggerContent={
              <>
                <span>Report App</span>
                <Icon icon="heroicons:flag-20-solid" />
              </>
            }
            triggerClasses="w-full px-4 py-1.5 text-sm flex items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 focus-visible:global-focus">
            <ReportProduct productName={product.name} />
          </Modal>
        </li>
      </ul>
    </div>
  );
};

export default ProductItemOptions;
