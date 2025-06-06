import { Button } from "@/components/ui/button";
import { PROPERTY_TYPES } from "@/lib/constants";

interface PropertyFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function PropertyFilters({ activeFilter, onFilterChange }: PropertyFiltersProps) {
  const filters = [
    { value: "todos", label: "Todas" },
    { value: "arriendo", label: "Arriendo" },
    { value: "venta", label: "Venta" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={activeFilter === filter.value ? "default" : "outline"}
          className={
            activeFilter === filter.value
              ? "bg-primary text-primary-foreground"
              : "border-border text-foreground hover:bg-muted"
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
