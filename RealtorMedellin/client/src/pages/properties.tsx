import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import PropertyCard from "@/components/property-card";
import PropertyFilters from "@/components/property-filters";
import { Button } from "@/components/ui/button";
import type { Property } from "@shared/schema";

export default function Properties() {
  const [location] = useLocation();
  const [activeFilter, setActiveFilter] = useState("todos");
  
  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("type");
    if (typeParam) {
      setActiveFilter(typeParam);
    }
  }, [location]);

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", activeFilter !== "todos" ? `?type=${activeFilter}` : ""],
  });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Update URL without navigation
    const newUrl = filter === "todos" ? "/propiedades" : `/propiedades?type=${filter}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Nuestras Propiedades</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explora nuestra amplia selección de propiedades en Medellín y encuentra tu hogar ideal
          </p>
        </div>

        <PropertyFilters 
          activeFilter={activeFilter} 
          onFilterChange={handleFilterChange} 
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-muted rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              No se encontraron propiedades
            </h3>
            <p className="text-muted-foreground mb-8">
              No hay propiedades disponibles con los filtros seleccionados.
            </p>
            <Button onClick={() => handleFilterChange("todos")}>
              Ver todas las propiedades
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
