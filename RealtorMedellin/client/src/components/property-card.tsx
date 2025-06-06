import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString('es-CO')}`;
  };

  const getBadgeColor = (type: string) => {
    return type === "arriendo" ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600";
  };

  return (
    <Card className="property-card overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className={`${getBadgeColor(property.type)} text-white`}>
            {property.type === "arriendo" ? "Arriendo" : "Venta"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{property.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{property.description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {property.bedrooms} hab
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {property.bathrooms} baños
          </span>
          <span className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            {property.area} m²
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">{formatPrice(property.price)}</span>
          <span className="text-muted-foreground">{property.zone}</span>
        </div>
        
        <Link href={`/propiedad/${property.id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Ver Detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
