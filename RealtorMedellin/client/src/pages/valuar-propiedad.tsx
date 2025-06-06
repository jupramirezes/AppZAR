import PropertyCalculator from "@/components/property-calculator";

export default function ValuarPropiedad() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Valúa tu Propiedad</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Obtén una estimación gratuita e instantánea del valor de tu propiedad en Medellín. 
            Nuestro sistema utiliza datos del mercado local para brindarte una valuación precisa.
          </p>
        </div>
        
        <PropertyCalculator />
        
        {/* Benefits Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-muted rounded-xl">
            <div className="bg-primary text-white p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Estimación Instantánea</h3>
            <p className="text-muted-foreground">
              Recibe el valor estimado de tu propiedad en menos de 2 minutos
            </p>
          </div>
          
          <div className="text-center p-6 bg-muted rounded-xl">
            <div className="bg-green-500 text-white p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Datos del Mercado Local</h3>
            <p className="text-muted-foreground">
              Utilizamos información actualizada del mercado inmobiliario de Medellín
            </p>
          </div>
          
          <div className="text-center p-6 bg-muted rounded-xl">
            <div className="bg-yellow-500 text-white p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Visita Gratuita</h3>
            <p className="text-muted-foreground">
              Solicita una valuación presencial sin costo para mayor precisión
            </p>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Quieres vender o arrendar tu propiedad?</h2>
          <p className="text-lg opacity-90 mb-6">
            Después de conocer el valor de tu propiedad, podemos ayudarte a encontrar los mejores compradores o inquilinos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contacto" className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contactar Asesor
            </a>
            <a href="/propiedades" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors">
              Ver Propiedades
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}