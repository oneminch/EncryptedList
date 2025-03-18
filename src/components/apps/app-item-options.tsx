import { Icon } from "@iconify/react";
import Modal from "../modal/modal";
import Alternatives from "./app-alternatives-list";
import ReportApp from "./app-report-modal";

interface AppItemOptionsProps {
  app: {
    name: string;
    hasAlternatives: boolean;
  };
}

type AppItemOptionsToggleProps = {
  appName: AppItemOptionsProps["app"]["name"];
};

const AppItemOptionsToggle: React.FC<AppItemOptionsToggleProps> = ({
  appName
}) => {
  return (
    <label
      className="z-30 h-7 w-7 absolute right-5 top-4 grow-0 shrink-0 p-0.5 flex items-center cursor-pointer rounded-full text-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 has-checked:bg-zinc-200 dark:has-checked:bg-zinc-800 focus-within:global-focus focus-within:bg-zinc-100/25 dark:focus-within:bg-zinc-800/25"
      title={`Toggle Options for ${appName}`}
      aria-label={`Toggle Options for ${appName}`}>
      <input type="checkbox" className="peer sr-only" />
      <span className="w-full h-full peer-checked:hidden flex items-center justify-center rounded-full text-center bg-transparent cursor-pointer">
        <Icon icon="ph:caret-down" />
      </span>
      <span className="w-full h-full peer-checked:flex hidden items-center justify-center rounded-full text-center bg-transparent cursor-pointer">
        <Icon icon="ph:caret-up" />
      </span>
    </label>
  );
};

const AppItemOptions: React.FC<AppItemOptionsProps> = ({ app }) => {
  return (
    <div className="z-0 has-checked:z-20 absolute inset-0 rounded-md group/options">
      <AppItemOptionsToggle appName={app.name} />
      <ul className="w-full h-full hover:z-20 gap-2.5 *:w-2/3 bg-zinc-50/75 dark:bg-zinc-900/75 backdrop-blur-md opacity-0 group-has-[:checked]/options:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center *:max-w-60">
        <li className="transform scale-95 group-has-[:checked]/options:scale-100 transition-transform duration-300 ease-in-out">
          {app.hasAlternatives && (
            <Modal
              title="Alternative To"
              triggerContent={
                <>
                  <span>Alternative To</span>
                  <Icon icon="ph:arrows-left-right" />
                </>
              }
              triggerClasses="w-full px-4 py-1.5 text-sm flex items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-zinc-800 border-[0.9px] border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 focus-visible:global-focus">
              <Alternatives appName={app.name} />
            </Modal>
          )}
        </li>
        <li className="transform scale-95 group-has-[:checked]/options:scale-100 transition-transform duration-300 ease-in-out">
          <Modal
            title="Report App"
            closableByAnyMeans={false}
            triggerContent={
              <>
                <span>Report App</span>
                <Icon icon="ph:flag-banner-duotone" />
              </>
            }
            triggerClasses="w-full px-4 py-1.5 text-sm flex items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-zinc-800 border-[0.9px] border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 focus-visible:global-focus">
            <ReportApp appName={app.name} />
          </Modal>
        </li>
      </ul>
    </div>
  );
};

export default AppItemOptions;
