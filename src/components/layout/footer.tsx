import Disclaimer from "../shared/disclaimer";
import Modal from "../shared/modal";

export default function Footer(): React.ReactNode {
  return (
    <footer className="w-full mt-4 mx-auto space-y-2 py-6 px-12 text-center text-zinc-600 dark:text-zinc-300 overflow-hidden">
      <p>
        Trademarks used on this website are the property of their respective
        owners.
      </p>
      <div className="flex justify-center items-center gap-x-3">
        <Modal
          title="Disclaimer"
          triggerText="Disclaimer"
          triggerClasses="text-zinc-600 dark:text-zinc-300 underline  decoration-yellow-400">
          <Disclaimer />
        </Modal>
        <p>&bull;</p>
        <p>&copy; 2024</p>
      </div>
    </footer>
  );
}
