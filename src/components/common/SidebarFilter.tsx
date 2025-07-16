import type { FilterConfig } from "@/config/filterConfig";
import type { FilterState } from "@/types/filter";
import React from "react";
import DynamicFilterRenderer from "./DynamicFilterRenderer";

interface SidebarFilterProps {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  config: FilterConfig[];
  onClose?: () => void;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  filters,
  setFilters,
  config,
}) => {
  return (
    <aside className="w-full md:max-w-72 shrink-0 bg-white dark:bg-gray-800 p-4 h-full overflow-y-auto mt-6 md:mt-0">
      <DynamicFilterRenderer
        filters={filters}
        setFilters={setFilters}
        config={config}
      />
    </aside>
  );
};
