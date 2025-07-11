import React, { useEffect } from "react";
import clsx from "clsx";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  className = "",
  overlayClassName = "",
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, onClose]);

  if (!open) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
        overlayClassName
      )}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={clsx(
          "bg-background text-foreground rounded-lg shadow-lg max-w-lg w-full mx-4 relative animate-fade-in-up",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 pt-5 pb-3 text-lg font-semibold border-b border-border">
            {title}
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="px-6 pt-2 pb-4 border-t border-border">{footer}</div>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted hover:text-foreground transition"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};
