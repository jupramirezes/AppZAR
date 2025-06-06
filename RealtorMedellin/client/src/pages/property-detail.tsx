import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Bed, Bath, Square, MapPin, Phone, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { COMPANY_INFO, WHATSAPP_MESSAGE } from "@/lib/constants";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
  });

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString('es-CO')}`;
  };

  const getBadgeColor = (type: string) => {
    return type === "arriendo" ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600";
  };

  const handleWhatsAppContact = () => {
    const whatsappNumber = COMPANY_INFO.whatsapp.replace('+', '');
    const message = `Hola, me interesa la propiedad: ${property?.title}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="h-96 bg-muted rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-32 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="pt-20 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Propiedad no encontrada</h1>
          <p className="text-muted-foreground mb-8">
            La propiedad que buscas no existe o ha sido eliminada.
          </p>
          <Link href="/propiedades">
            <Button>Volver a Propiedades</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/propiedades">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Propiedades
          </Button>
        </Link>

        {/* Property Image */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <img 
            src={property.imageUrl} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className={`${getBadgeColor(property.type)} text-white`}>
              {property.type === "arriendo" ? "Arriendo" : "Venta"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-foreground mb-4">{property.title}</h1>
            
            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{property.zone}, Medellín</span>
            </div>

            <div className="flex items-center gap-6 mb-6 text-sm">
              <span className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                {property.bedrooms} habitaciones
              </span>
              <span className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                {property.bathrooms} baños
              </span>
              <span className="flex items-center gap-2">
                <Square className="h-5 w-5" />
                {property.area} m²
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Características</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium">{property.type === "arriendo" ? "Arriendo" : "Venta"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Zona</span>
                  <span className="font-medium">{property.zone}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Habitaciones</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Baños</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Área</span>
                  <span className="font-medium">{property.area} m²</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Precio</span>
                  <span className="font-medium text-primary">{formatPrice(property.price)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-muted-foreground">
                    {property.type === "arriendo" ? "por mes" : "precio total"}
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <FaWhatsapp className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>

                  <Link href="/contacto">
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Enviar Mensaje
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    {COMPANY_INFO.phone}
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-foreground mb-2">Información de contacto</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{COMPANY_INFO.name}</p>
                    <p>{COMPANY_INFO.address}</p>
                    <p>{COMPANY_INFO.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
