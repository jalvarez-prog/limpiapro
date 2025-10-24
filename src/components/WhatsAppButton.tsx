import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  variant?: 'primary' | 'secondary' | 'icon' | 'text';
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  iconOnly?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '56950293803',
  message = 'Hola, me gustaría solicitar información sobre los servicios de limpieza',
  variant = 'primary',
  className = '',
  children,
  showIcon = true,
  iconOnly = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Detección mejorada de dispositivo y navegador
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    
    // URLs para diferentes plataformas
    const whatsappApiUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    if (isMobile) {
      // En dispositivos móviles, usar wa.me que abre directamente la app sin intermediarios
      window.location.href = whatsappApiUrl;
      
    } else {
      // En desktop - Abrir WhatsApp Web directamente
      window.open(whatsappWebUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Estilos base según la variante
  const baseStyles = {
    primary: 'flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group overflow-hidden',
    secondary: 'flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg font-medium transition-all duration-300 transform hover:scale-105',
    icon: 'p-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg',
    text: 'inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-300',
  };
  
  const selectedStyle = baseStyles[variant] || baseStyles.primary;
  const finalClassName = `${selectedStyle} ${className} cursor-pointer`;
  
  // Generar URL fallback para accesibilidad
  const fallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  if (iconOnly) {
    return (
      <a 
        href={fallbackUrl}
        onClick={handleClick}
        className={finalClassName}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
      </a>
    );
  }
  
  return (
    <a 
      href={fallbackUrl}
      onClick={handleClick}
      className={finalClassName}
      aria-label="Contactar por WhatsApp"
    >
      {showIcon && <MessageCircle className="h-4 w-4 fill-current" />}
      {children || <span>WhatsApp</span>}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      )}
    </a>
  );
};

export default WhatsAppButton;