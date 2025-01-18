"use client";

import { Drawer } from "vaul";

export default function VaulDrawer({
  children,
  titleText,
  triggerText,
  triggerClasses
}: {
  children: React.ReactNode;
  titleText: string;
  triggerText: string;
  triggerClasses?: string;
}): React.ReactNode {
  return (
    <Drawer.Root shouldScaleBackground={false}>
      <Drawer.Trigger className={triggerClasses}>{triggerText}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/75" />
        <Drawer.Content className="w-full text-left px-6 pt-2 pb-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 overflow-hidden flex flex-col rounded-t-lg mt-24 h-fit absolute bottom-0 left-0 right-0 outline-none">
          <Drawer.Handle className="mt-2" />
          <div className="p-4 rounded-t-md flex-1">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="text-zinc-900 dark:text-zinc-100 font-medium text-xl mb-4">
                {titleText}
              </Drawer.Title>
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
