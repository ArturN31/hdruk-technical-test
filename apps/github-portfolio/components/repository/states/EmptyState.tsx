import { Search } from "lucide-react";
import { Button } from "@/components/common/Button";

export interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="p-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <Search className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-900">No repositories found</h3>
      <p className="mt-2 text-sm text-gray-500">Try adjusting your filters or search term.</p>
      <div className="mt-6">
        <Button onClick={onClearFilters} variant="secondary">
          Clear all filters
        </Button>
      </div>
    </div>
  );
}
