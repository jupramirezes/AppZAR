import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { ZONES, PROPERTY_TYPES } from "@/lib/constants";

export default function HeroSection() {
  const [searchType, setSearchType] = useState("");
  const [searchZone, setSearchZone] = useState("");

  const handleSearch = () => {
    let searchParams = new URLSearchParams();
    if (searchType) searchParams.append("type", searchType);
    if (searchZone) searchParams.append("zone", searchZone);
    
    const queryString = searchParams.toString();
    window.location.href = `/propiedades${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Tu hogar ideal en <span className="text-yellow-400">Medellín</span> te está esperando
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
          Descubre las mejores propiedades en la ciudad de la eterna primavera. Te acompañamos en cada paso hacia tu nuevo hogar.
        </p>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-6 shadow-2xl max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-foreground text-sm font-medium mb-2">¿Qué buscas?</label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de propiedad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arriendo">Apartamento en arriendo</SelectItem>
                  <SelectItem value="venta">Casa en venta</SelectItem>
                  <SelectItem value="comercial">Local comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">Zona</label>
              <Select value={searchZone} onValueChange={setSearchZone}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar zona" />
                </SelectTrigger>
                <SelectContent>
                  {ZONES.map((zone) => (
                    <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/propiedades">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium">
              Ver Propiedades
            </Button>
          </Link>
          <Link href="/contacto">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground">
              Hablar con un Asesor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
