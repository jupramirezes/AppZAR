import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import PropertyCard from "@/components/property-card";
import AboutSection from "@/components/about-section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Property } from "@shared/schema";

export default function Home() {
  const { data: featuredProperties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  return (
    <div>
      <HeroSection />
      
      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Propiedades Destacadas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre nuestra selección de las mejores propiedades disponibles en Medellín y el área metropolitana
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-muted rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties?.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link href="/propiedades">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    Ver Más Propiedades
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <AboutSection />
      
      {/* Property Calculator CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Conoces el valor real de tu propiedad?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Obtén una valuación gratuita e instantánea usando nuestro calculador inteligente. 
            Basado en datos reales del mercado inmobiliario de Medellín.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/valuar-propiedad">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                Valuar Mi Propiedad Gratis
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Hablar con un Experto
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">¿Listo para encontrar tu hogar ideal?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Contáctanos hoy mismo y comencemos juntos el camino hacia tu nuevo hogar en Medellín
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Contactar Ahora
              </Button>
            </Link>
            <Link href="/propiedades">
              <Button size="lg" variant="outline">
                Ver Todas las Propiedades
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
