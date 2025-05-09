"use client";

import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  triggerContent: string | React.ReactNode;
  triggerClasses?: string;
  closableByAnyMeans?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  triggerContent,
  triggerClasses,
  closableByAnyMeans = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = () => {
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    if (isAnimating) {
      setIsAnimating(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      modalContainerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closableByAnyMeans) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closableByAnyMeans]);

  return (
    <>
      <button
        type="button"
        title={title}
        aria-label={title}
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer shrink-0 ${triggerClasses}`}>
        {triggerContent}
      </button>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            className={`fixed inset-0 flex items-end justify-center sm:items-center bg-zinc-50/75 dark:bg-zinc-900/75 backdrop-blur-xs z-50 ${
              closableByAnyMeans && "cursor-pointer"
            } ${isAnimating ? "animate-fade-out" : "animate-fade-in"}`}
            onClick={closableByAnyMeans ? handleClose : undefined}
            onAnimationEnd={handleAnimationEnd}>
            <div
              className="relative w-full sm:w-auto h-auto max-w-(--breakpoint-sm) rounded-t-lg sm:rounded-lg pt-6 pb-8 px-8 flex flex-col gap-y-4 justify-between bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 transform overflow-auto"
              tabIndex={-1}
              ref={modalContainerRef}
              onClick={(e) => e.stopPropagation()}>
              <button
                className="icon-button w-8! h-8! border-none! bg-transparent! hover:bg-zinc-200! dark:hover:bg-zinc-700! hidden! sm:flex! absolute top-2 right-2 rounded-md!"
                aria-label="Close Modal"
                title="Close Modal"
                onClick={handleClose}>
                <Icon icon="ph:x" />
              </button>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </h2>
              {children}
              <button
                className="icon-button mt-6 mx-auto text-xs! w-auto! h-8! px-4! flex! sm:hidden! rounded-full! hover:bg-zinc-200! dark:hover:bg-zinc-700!"
                onClick={handleClose}>
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
