import { FaWhatsapp } from "react-icons/fa";
import { COMPANY_INFO, WHATSAPP_MESSAGE } from "@/lib/constants";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const whatsappNumber = COMPANY_INFO.whatsapp.replace('+', '');
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="h-8 w-8" />
      </button>
    </div>
  );
}
