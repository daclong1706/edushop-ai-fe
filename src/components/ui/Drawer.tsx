// components/ui/Drawer.tsx
import React, { useEffect } from "react";
import clsx from "clsx";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "left" | "right" | "bottom";
  width?: string; // 12, 64, v.v.
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "w-64",
  className = "",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const positionClasses = {
    right: `right-0 top-0 h-full w-${width}`,
    left: `left-0 top-0 h-full w-${width}`,
    bottom: `bottom-0 left-0 w-full h-1/2`,
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div
        className={clsx(
          "absolute bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300",
          positionClasses[position],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
