// SidebarFilter.tsx
import React from "react";
import type { FilterState } from "@/types/filter";
import type { FilterConfig } from "@/config/filterConfig";
import DynamicFilterRenderer from "./DynamicFilterRenderer";
import { HiChevronLeft } from "react-icons/hi"; // ✅ React icon

interface SidebarFilterProps {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  config: FilterConfig[];
  onClose?: () => void;
  canClose?: boolean; // hiển thị nút đóng trên desktop nếu true
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  filters,
  setFilters,
  config,
  onClose,
  canClose = false,
}) => {
  return (
    <aside className="w-80 bg-white dark:bg-gray-900 p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bộ lọc</h2>
        {canClose && onClose && (
          <button onClick={onClose}>
            <HiChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </button>
        )}
      </div>

      <DynamicFilterRenderer
        filters={filters}
        setFilters={setFilters}
        config={config}
      />
    </aside>
  );
};
