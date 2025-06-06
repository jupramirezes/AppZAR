import ContactForm from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { COMPANY_INFO, WHATSAPP_MESSAGE } from "@/lib/constants";

export default function Contact() {
  const handleWhatsAppClick = () => {
    const whatsappNumber = COMPANY_INFO.whatsapp.replace('+', '');
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Nuestra oficina",
      details: ["Carrera 43A #5A-113, El Poblado", "Medellín, Antioquia"],
      color: "bg-primary"
    },
    {
      icon: Phone,
      title: "Teléfono",
      details: [COMPANY_INFO.phone, `WhatsApp: ${COMPANY_INFO.whatsapp}`],
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "Email",
      details: [COMPANY_INFO.email, "info@inmobiliariamedellin.com"],
      color: "bg-yellow-500"
    },
    {
      icon: Clock,
      title: "Horarios de atención",
      details: [COMPANY_INFO.hours.weekdays, COMPANY_INFO.hours.saturday, COMPANY_INFO.hours.sunday],
      color: "bg-purple-600"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">¿Listo para encontrar tu hogar ideal?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contáctanos hoy mismo y comencemos juntos el camino hacia tu nuevo hogar en Medellín
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Información de contacto</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`${info.color} text-white p-3 rounded-full`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* WhatsApp CTA */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <FaWhatsapp className="text-green-600 text-4xl mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-foreground mb-2">¿Necesitas atención inmediata?</h4>
                <p className="text-muted-foreground mb-4">Escríbenos por WhatsApp y te respondemos al instante</p>
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  Chatear por WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
