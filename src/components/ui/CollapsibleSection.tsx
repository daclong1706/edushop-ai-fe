import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

export type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  maxHeightPx?: number;
  className?: string;
  titleClassName?: string;
  scrollOnExpand?: boolean;
};

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = true,
  maxHeightPx = 120,
  className = "",
  titleClassName = "",
  scrollOnExpand = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Đo nội dung sau render
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    el.style.maxHeight = "none"; // mở rộng toàn phần để đo chính xác
    requestAnimationFrame(() => {
      const scrollHeight = el.scrollHeight;
      setShouldShowToggle(scrollHeight > maxHeightPx);
      // reset lại để apply giới hạn
      el.style.maxHeight = isExpanded ? "none" : `${maxHeightPx}px`;
    });
  }, [children, maxHeightPx, isExpanded]);

  return (
    <div
      className={clsx(
        "border-b border-gray-200 dark:border-gray-700 py-2",
        className
      )}
    >
      <button
        className="flex items-center justify-between w-full gap-2 text-left font-medium text-gray-800 dark:text-gray-200 hover:text-primary min-h-[40px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={clsx("flex-1 font-bold", titleClassName)}>
          {title}
        </span>
        <svg
          className={clsx(
            "w-4 h-4 shrink-0 transform transition-transform duration-200",
            { "rotate-180": isOpen }
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={clsx("transition-all overflow-hidden duration-300", {
          "max-h-0": !isOpen,
        })}
      >
        <div
          ref={contentRef}
          style={{
            maxHeight: isOpen && !isExpanded ? `${maxHeightPx}px` : "none",
            transition: "max-height 0.3s ease",
          }}
          className={clsx("relative space-y-2 pr-1 mb-2", {
            "overflow-hidden": !isExpanded,
            "overflow-y-auto custom-scrollbar": isExpanded && scrollOnExpand,
          })}
        >
          {children}

          {isOpen && shouldShowToggle && !isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-10 pointer-events-none bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
          )}
        </div>

        {isOpen && shouldShowToggle && (
          <Button
            size="sm"
            ghost
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
          </Button>
        )}
      </div>
    </div>
  );
};
