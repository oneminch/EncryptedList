import Drawer from "@/components/shared/drawer";
import Disclaimer from "../shared/disclaimer";

export default function Footer(): React.ReactNode {
  return (
    <footer className="w-full mt-4 mx-auto space-y-2 py-6 px-12 text-center text-zinc-500 dark:text-zinc-400 overflow-hidden">
      <p className="space-x-3">
        <Drawer
          triggerText="Disclaimer"
          triggerClasses="text-zinc-600 dark:text-zinc-400 underline decoration-dashed decoration-yellow-400"
          titleText="Disclaimer">
          <Disclaimer />
        </Drawer>
        <span>&bull;</span>
        <span>&copy; 2024</span>
      </p>
      <p>
        Trademarks used on this website are the property of their respective
        owners.
      </p>
    </footer>
  );
}
