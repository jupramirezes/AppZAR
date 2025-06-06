export const COMPANY_INFO = {
  name: "Inmobiliaria Medellín",
  phone: "(+57) 4 444 5555",
  whatsapp: "+573001234567",
  email: "hola@inmobiliariamedellin.com",
  address: "Carrera 43A #5A-113, El Poblado, Medellín, Antioquia",
  hours: {
    weekdays: "Lunes a Viernes: 8:00 AM - 6:00 PM",
    saturday: "Sábados: 9:00 AM - 4:00 PM",
    sunday: "Domingos: Solo citas programadas"
  }
};

export const PROPERTY_TYPES = {
  arriendo: "Arriendo",
  venta: "Venta"
};

export const ZONES = [
  "El Poblado",
  "Laureles",
  "Envigado",
  "Sabaneta",
  "Itagüí",
  "Bello",
  "La Estrella"
];

export const SOCIAL_LINKS = {
  facebook: "#",
  instagram: "#",
  linkedin: "#",
  whatsapp: `https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}`
};

export const WHATSAPP_MESSAGE = "Hola, me interesa conocer más sobre sus propiedades";
