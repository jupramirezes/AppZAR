import { Link } from "wouter";
import { Home, Facebook, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Inicio" },
    { href: "/propiedades", label: "Propiedades" },
    { href: "/#sobre-nosotros", label: "Sobre Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Home className="text-primary text-2xl mr-2" />
              <span className="text-xl font-bold">{COMPANY_INFO.name}</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Tu aliado de confianza en el mercado inmobiliario de Medellín. Hacemos realidad tu sueño de encontrar el hogar perfecto en la ciudad de la eterna primavera.
            </p>
            <div className="flex space-x-4">
              <a href={SOCIAL_LINKS.facebook} className="text-gray-300 hover:text-primary transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href={SOCIAL_LINKS.instagram} className="text-gray-300 hover:text-primary transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} className="text-gray-300 hover:text-primary transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                <FaWhatsapp className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Carrera 43A #5A-113</li>
              <li>El Poblado, Medellín</li>
              <li>{COMPANY_INFO.phone}</li>
              <li>{COMPANY_INFO.email}</li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-600 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300">
          <p>&copy; 2024 {COMPANY_INFO.name}. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-200">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
