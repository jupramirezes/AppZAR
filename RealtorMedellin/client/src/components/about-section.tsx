import { Heart, MapPin, Shield } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: "Atención Personalizada",
      description: "Cada cliente es único. Te acompañamos paso a paso para encontrar exactamente lo que buscas.",
      color: "bg-primary"
    },
    {
      icon: MapPin,
      title: "Conocimiento Local",
      description: "Conocemos Medellín como la palma de nuestra mano. Te asesoramos sobre las mejores zonas y oportunidades.",
      color: "bg-green-500"
    },
    {
      icon: Shield,
      title: "Transparencia Total",
      description: "Sin sorpresas ni costos ocultos. Manejamos cada transacción con total honestidad y profesionalismo.",
      color: "bg-yellow-500"
    }
  ];

  return (
    <section id="sobre-nosotros" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-6">¿Por qué elegirnos?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Somos una inmobiliaria joven y dinámica, comprometida con hacer realidad tu sueño de encontrar el hogar perfecto en Medellín. Nuestra experiencia local y dedicación personalizada nos distingue.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`${feature.color} text-white p-3 rounded-full`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Equipo de profesionales inmobiliarios" 
              className="rounded-xl shadow-lg" 
            />
            <img 
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Familia feliz con las llaves de su nuevo hogar" 
              className="rounded-xl shadow-lg mt-8" 
            />
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Consulta inmobiliaria personalizada" 
              className="rounded-xl shadow-lg -mt-8" 
            />
            <img 
              src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Vista panorámica de Medellín" 
              className="rounded-xl shadow-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
